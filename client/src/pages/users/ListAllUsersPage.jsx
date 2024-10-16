import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext.jsx';
import { useDocumentTitle } from '../../hooks/index.js';
import toast from 'react-hot-toast';

const { VITE_API_URL } = import.meta.env;

//////

const ListAllUsersPage = () => {
    useDocumentTitle('Gestión de usuarios'); // Título de pestaña
    const { authToken } = useContext(AuthContext);
    const [users, setUsers] = useState([]);

    useEffect(() => {
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
                toast.error(err.message);
            }
        };

        const compareUsers = (newUsers) => {
            if (!users) {
                return false;
            }

            if (users?.length !== newUsers?.length) return false;

            for (const user of users) {
                //para cada usuario del state
                //buscamos un ususraio con id equivalente en newUsers. Si no lo hay, devolvemos false
                const newUser = newUsers.find(
                    (newUser) => newUser.id === user.id,
                );

                if (!newUser) return false;

                // si el usuraio de newUsers tiene una fecha de modificación distinta, devolvemos false
                if (user.updatedAt !== newUser.updatedAt) return false;
            }

            return true;
        };

        fetchUsers();
    }, [authToken, users]);

    const handleRemoveUser = async (user) => {
        try {
            const userId = user.id;

            const res = await fetch(`${VITE_API_URL}/users/delete/${userId}`, {
                method: 'DELETE',
                headers: { Authorization: authToken },
            });
            const body = await res.json();

            if (body.status === 'error') throw new Error(body.message);
            toast.success(body.message);
        } catch (err) {
            toast.error(err.message, { id: 'alluserspage' });
        }
    };

    const handleButtonClick = async (user) => {
        try {
            if (user.active) {
                if (
                    !confirm(
                        `¿Está seguro de que desea eliminar al usuario ${user.username}?`,
                    )
                )
                    return;
                handleRemoveUser(user);
            } else {
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

                // Forzamos que la página se refresque automáticamente
                window.location.reload();
            }
        } catch (err) {
            toast.error(err.message, { id: 'alluserspage' });
        }
    };

    return (
        <div className="w-full px-4 lg:px-24 py-8">
            <h1 className="text-header-big text-center ml-0">
                Gestión de Usuarios
            </h1>
            <div className="overflow-x-auto mt-8">
                <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
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
                                Estado
                            </th>
                            <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                                Acciones
                            </th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-700">
                        {users.length > 0 ? (
                            users.map((user) => (
                                <tr key={user.id} className="border-b">
                                    <td className="py-3 px-4">{user.id}</td>
                                    <td className="py-3 px-4">
                                        {user.firstName + ' ' + user.lastName}
                                    </td>
                                    <td className="py-3 px-4">{user.email}</td>
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
                                <td colSpan="5" className="text-center py-4">
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
