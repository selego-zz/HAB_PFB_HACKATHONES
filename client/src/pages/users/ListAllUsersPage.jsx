import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';

import toast from 'react-hot-toast';
import Swal from 'sweetalert2';

import { useDocumentTitle } from '../../hooks/index.js';
const { VITE_API_URL } = import.meta.env;

//////

const ListAllUsersPage = () => {
    useDocumentTitle('Gestión de usuarios'); // Título de pestaña
    const { authToken, isAdmin } = useContext(AuthContext);
    const [users, setUsers] = useState([]);
    const [filter, setFilter] = useState('all'); // Estado para el filtro de usuarios
    const navigate = useNavigate();

    useEffect(() => {
        // Si el usuario que trata de acceder a la página no es administrador, lo redirigimos automáticamente a la homepage
        if (!isAdmin()) {
            toast.error('No tienes permisos para realizar esa acción', {
                id: 'listalluserspage',
            });
            navigate('/');
            return;
        }

        const fetchUsers = async () => {
            try {
                const res = await fetch(
                    `${import.meta.env.VITE_API_URL}/users/getAllUsers`,
                    {
                        headers: {
                            Authorization: authToken,
                        },
                    },
                );

                const body = await res.json();

                if (body.status === 'error') {
                    throw new Error(body.message);
                }

                // Si no es un array, no lo metemos en users
                if (!Array.isArray(body.data.users)) return;

                // Hace que no se llame infinitamente
                if (!compareUsers(body.data.users)) setUsers(body.data.users);
            } catch (err) {
                toast.error(err.message, { id: 'listalluserspage' });
            }
        };

        // Compara los usuarios actuales con los nuevos para evitar recargar innecesariamente
        const compareUsers = (newUsers) => {
            if (!users) {
                return false;
            }

            if (users?.length !== newUsers?.length) return false;

            for (const user of users) {
                // Para cada usuario del state, buscamos uno con ID equivalente en newUsers.
                const newUser = newUsers.find(
                    (newUser) => newUser.id === user.id,
                );

                if (!newUser) return false;

                // Si el usuario tiene una fecha de modificación distinta, devolvemos false
                if (user.updatedAt !== newUser.updatedAt) return false;
            }

            return true;
        };

        fetchUsers();
    }, [authToken, users, isAdmin, navigate]);

    const handleRemoveUser = async (user) => {
        try {
            // Comprobamos que no se está tratando de eliminar a un administrador
            if (user.role === 'administrador') {
                await Swal.fire({
                    title: 'Acción no permitida',
                    text: 'No se puede eliminar a un administrador.',
                    icon: 'error',
                });
                return;
            }

            // Confirmación con sweetalert2.
            const resultDelete = await Swal.fire({
                title: '¿Estás seguro de que quieres eliminar a este usuario?',
                text: `Has seleccionado al usuario ${user.firstName} ${user.lastName}, con alias ${user.username}.`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#FF3333',
                cancelButtonColor: '#22577A',
                confirmButtonText: 'Sí, eliminar a este usuario',
                cancelButtonText: 'Cancelar',
            });

            // Si el administrador confirma, procedemos con la eliminación.
            if (resultDelete.isConfirmed) {
                const userId = user.id;

                const res = await fetch(
                    `${VITE_API_URL}/users/delete/${userId}`,
                    {
                        method: 'DELETE',
                        headers: { Authorization: authToken },
                    },
                );
                const body = await res.json();

                if (body.status === 'error') throw new Error(body.message);

                // Mostramos confirmación de eliminación con SweetAlert
                await Swal.fire({
                    title: 'Usuario eliminado',
                    text: 'El usuario ha sido desactivado en la base de datos.',
                    icon: 'success',
                });

                // Forzamos que la página se refresque automáticamente para actualizar la lista
                window.location.reload();
            }
        } catch (err) {
            toast.error(err.message, { id: 'alluserspage' });
        }
    };

    const handleButtonClick = async (user) => {
        try {
            if (user.active) {
                handleRemoveUser(user);
            } else {
                // Confirmación con sweetalert2.
                const resultValidate = await Swal.fire({
                    title: 'Usuario pendiente de validación',
                    text: `Has seleccionado al usuario ${user.firstName} ${user.lastName}, con alias ${user.username}.`,
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#FF3333',
                    cancelButtonColor: '#22577A',
                    confirmButtonText: 'Validar a este usuario',
                    cancelButtonText: 'Cancelar',
                });

                // Si el administrador confirma, procedemos con la eliminación.
                if (resultValidate.isConfirmed) {
                    const res = await fetch(
                        `${import.meta.env.VITE_API_URL}/users/addOrganizer/${user.id}`,
                        {
                            method: 'PUT',
                            headers: {
                                Authorization: authToken,
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(user),
                        },
                    );

                    const body = await res.json();

                    if (body.status === 'error') {
                        throw new Error(body.message);
                    }

                    toast.success('Usuario activado correctamente', {
                        id: 'alluserspage',
                    });

                    // Forzamos que la página se refresque automáticamente para actualizar la lista
                    window.location.reload();
                }
            }
        } catch (err) {
            toast.error(err.message, { id: 'alluserspage' });
        }
    };

    // Función que filtra usuarios
    const filteredUsers = users.filter((user) => {
        if (filter === 'active') {
            return user.active;
        } else if (filter === 'pending') {
            return !user.active;
        } else {
            return true;
        }
    });

    return (
        <div className="w-full px-4 lg:px-24 py-8">
            <h1 className="text-header-big text-center ml-0">
                Gestión de Usuarios
            </h1>

            {/* Filtro de usuarios */}
            <div className="mt-4 flex justify-end">
                <label className="mr-4 font-semibold my-auto align-middle">
                    Filtrar por estado:
                </label>
                <select
                    className="p-2 border rounded"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                >
                    <option value="all">Todos</option>
                    <option value="active">Activado</option>
                    <option value="pending">Pendiente</option>
                </select>
            </div>

            <div className="overflow-x-auto mt-8">
                <table className="min-w-full shadow-md rounded-lg overflow-hidden">
                    <thead>
                        <tr className="bg-azuloscuro text-blanco">
                            <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                                ID
                            </th>
                            <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                                Nombre
                            </th>
                            <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                                Email
                            </th>
                            <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                                Rol
                            </th>
                            <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                                Estado
                            </th>
                            <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                                Acciones
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.length > 0 ? (
                            filteredUsers.map((user) => (
                                <tr key={user.id} className="border-b">
                                    <td className="py-3 px-4">{user.id}</td>
                                    <td className="py-3 px-4">
                                        {user.firstName + ' ' + user.lastName}
                                    </td>
                                    <td className="py-3 px-4">{user.email}</td>
                                    <td className="py-3 px-4">{user.role}</td>
                                    <td className="py-3 px-4">
                                        {user.active ? 'Activado' : 'Pendiente'}
                                    </td>
                                    <td className="py-3 px-4">
                                        {user.active ? (
                                            <button
                                                onClick={() => {
                                                    handleButtonClick(user);
                                                }}
                                                className="button-rounded-red"
                                            >
                                                Eliminar usuario
                                            </button>
                                        ) : (
                                            <button
                                                onClick={() => {
                                                    handleButtonClick(user);
                                                }}
                                                className="button-rounded-green"
                                            >
                                                Activar usuario
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="text-center py-4">
                                    No hay usuarios disponibles.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ListAllUsersPage;
