// Importamos las prop-types.
import PropTypes from 'prop-types';

// Importamos la función que genera un contexto y los hooks.
import { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Importamos el nombre que le daremos al token.
const { VITE_AUTH_TOKEN, VITE_API_URL, VITE_API_UPLOADS } = import.meta.env;

//////

// Creamos un contexto.
export const AuthContext = createContext(null);

// Creamos el componente AuthProvider.
export const AuthProvider = ({ children }) => {
    // Inicializo authLoading a true por que nada más crear no tenemos user todavía
    const [authLoading, setAuthLoading] = useState(true);

    // Declaramos una variable en el state para manejar el token.
    const [authToken, setAuthToken] = useState(
        localStorage.getItem(VITE_AUTH_TOKEN) || null,
    );

    // Declaramos una variable en el State para almacenar los datos del usuario.
    const [authUser, setAuthUser] = useState(null);
    const navigate = useNavigate();

    // Solicitamos los datos del usuario si existe un token.
    useEffect(() => {
        const fetchUser = async () => {
            setAuthLoading(true);

            try {
                if (authUser) return;

                // Respuesta del servidor
                const res = await fetch(`${VITE_API_URL}/users`, {
                    headers: {
                        Authorization: authToken,
                    },
                });

                // Obtenemos el body, y si hubo algún error lo lanzamos.
                const body = await res.json();

                if (body.status === 'error') {
                    throw new Error(body.message);
                }

                // Este es el punto donde obtenemos el usuario. Puede que venga con avatar o puede que no.
                // Si viene sin avatar le asignaremos el avatar por defecto
                if (!body.data.user.avatar || body.data.user.avatar.length < 1)
                    body.data.user.avatar = 'assets/images/default-avatar.png';
                else
                    body.data.user.avatar =
                        VITE_API_UPLOADS + '/' + body.data.user.avatar;

                // Establecemos los datos del usuario.
                setAuthUser(body.data.user);
            } catch (err) {
                // Si el token no es correcto lo eliminamos del State y del almacenamiento local.
                if (err.message === 'Token no válido') {
                    setAuthToken(null);
                    localStorage.removeItem(VITE_AUTH_TOKEN);
                }

                // Si hay un error eliminamos el usuario y lanzamos error.
                setAuthUser(null);
                throw new Error(err.message);
            } finally {
                setAuthLoading(false);
            }
        };

        if (authToken) {
            fetchUser();
        } else {
            setAuthUser(null);
        }
    }, [authToken, authUser]);

    // Función que guarda el token.
    const authLoginState = (token) => {
        setAuthToken(token);
        localStorage.setItem(VITE_AUTH_TOKEN, token);
    };

    // Función que elimina el token.
    const authLogoutState = () => {
        setAuthToken(null);
        localStorage.removeItem(VITE_AUTH_TOKEN);
        navigate('/');
    };

    // Función que actualiza el usuario en el State.
    const authUpdateUserState = (
        username,
        email,
        firstName,
        lastName,
        role,
        biography,
        linkedIn,
        avatar,
    ) => {
        setAuthUser((prevAuthUser) => ({
            ...prevAuthUser,
            username,
            email,
            firstName,
            lastName,
            role,
            biography,
            linkedIn,
            avatar,
        }));
    };

    // Función para verificar si el usuario tiene un rol específico.
    const hasRole = (role) => {
        return authUser?.role === role;
    };

    // Funciones para verificar qué rol tiene el usuario, si lo tiene.
    const isAdmin = () => hasRole('administrador');
    const isDeveloper = () => hasRole('desarrollador');
    const isOrganizer = () => hasRole('organizador');

    // Función para registrar un nuevo usuario.
    const registerUser = async (userData) => {
        try {
            const apiUrl =
                userData.role === 'desarrollador'
                    ? `${VITE_API_URL}/users/register`
                    : `${VITE_API_URL}/users/organizers/request`;
            const res = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            const body = await res.json();

            if (body.status === 'error') {
                throw new Error(body.message);
            }

            // Si el registro es exitoso, retornamos el mensaje.
            return body.message;
        } catch (err) {
            throw new Error(err.message);
        }
    };

    // Función para iniciar sesión
    const loginUser = async (credentials) => {
        try {
            const res = await fetch(`${VITE_API_URL}/users/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(credentials),
            });

            const body = await res.json();

            if (body.status === 'error') {
                throw new Error(body.message);
            }

            // Si el login es exitoso, se guarda el token y se establece el usuario.
            const { token, user } = body.data;
            authLoginState(token);
            setAuthUser(user);

            return body.data;
        } catch (err) {
            throw new Error(err.message);
        }
    };

    // función para actualizar el usuario. OJO: no actualiza el avatar
    const updateUser = async (userProfile) => {
        try {
            let avatar = null;
            if (userProfile.avatar) {
                avatar = userProfile.avatar;
                delete userProfile.avatar;
            }

            const res = await fetch(`${VITE_API_URL}/users/update`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: authToken,
                },
                body: JSON.stringify(userProfile),
            });

            const body = await res.json();

            if (body.status === 'error') {
                throw new Error(body.message);
            }

            userProfile.avatar = avatar;
            // Si la actualización fue exitosa, establecemos los nuevos datos del usuario.
            setAuthUser(body.data.user);
            return body.message;
        } catch (err) {
            throw new Error(err.message);
        }
    };
    // función para actualizar el avatar
    const updateUserWithAvatar = async (userProfile) => {
        try {
            // Creamos un objeto FormData.
            const formData = new FormData();

            // Adjuntamos todos los elementos de userProfile al formData.
            for (const [key, value] of Object.entries(userProfile)) {
                formData.append(key, value);
            }

            const res = await fetch(`${VITE_API_URL}/users/update`, {
                method: 'put',
                headers: {
                    Authorization: authToken,
                },
                body: formData,
            });

            const body = await res.json();

            if (body.status === 'error') {
                throw new Error(body.message);
            }

            // Si la actualización fue exitosa, establecemos los nuevos datos del usuario.
            setAuthUser(body.data.user);
            return body.message;
        } catch (err) {
            throw new Error(err.message);
        }
    };
    // función para actualizar el usuario. OJO: no actualiza el avatar
    const updatePassword = async (oldPass, newPass) => {
        try {
            const res = await fetch(`${VITE_API_URL}/users/password`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: authToken,
                },
                body: JSON.stringify({ oldPass, newPass }),
            });

            const body = await res.json();

            if (body.status === 'error') {
                throw new Error(body.message);
            }
            return body.message;
        } catch (err) {
            throw new Error(err.message);
        }
    };

    return (
        <AuthContext.Provider
            value={{
                authToken,
                authUser,
                authLoading,
                authLoginState,
                authLogoutState,
                authUpdateUserState,
                isAdmin,
                isDeveloper,
                isOrganizer,
                registerUser,
                loginUser,
                updateUser,
                updateUserWithAvatar,
                updatePassword,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

// Validamos las props.
AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
