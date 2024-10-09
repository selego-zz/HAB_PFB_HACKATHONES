import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext.jsx';

import { useDocumentTitle } from '../../hooks/index.js';
import toast from 'react-hot-toast';

//////

const ListAllUsersPage = () => {
    useDocumentTitle('Gestión de usuarios'); // Título de pestaña
    const { authToken } = useContext(AuthContext);

    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await fetch(
                    `${import.meta.env.VITE_API_URL}/users/getAllUsers?type=pending`,
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
                console.log(users);
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

    return 'hola';
};

export default ListAllUsersPage;
