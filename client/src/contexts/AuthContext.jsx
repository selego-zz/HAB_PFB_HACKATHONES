// Importamos las prop-types.
import PropTypes from 'prop-types';

// Importamos la función que genera un contexto y los hooks.
import { createContext, useState, useEffect } from 'react';

// Importamos el nombre que le daremos al token.
const { VITE_AUTH_TOKEN, VITE_API_URL } = import.meta.env;

//////

// Creamos un contexto.
export const AuthContext = createContext(null);

// Creamos el componente AuthProvider.
export const AuthProvider = ({ children }) => {
    // inicializo authLoading a true por que nada más crear no tenemos user todavía
    const [authLoading, setAuthLoading] = useState(true);

    // Declaramos una variable en el state para manejar el token.
    const [authToken, setAuthToken] = useState(
        localStorage.getItem(VITE_AUTH_TOKEN) || null,
    );

    // Declaramos una variable en el State para almacenar los datos del usuario.
    const [authUser, setAuthUser] = useState(null);

    // Solicitamos los datos del usuario si existe un token.
    useEffect(() => {
        const fetchUser = async () => {
            setAuthLoading(true);
            try {
                if (authUser) return;
                // Obtenemos una respuesta del servidor.

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
            const res = await fetch(`${VITE_API_URL}/users/register`, {
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

            // Si el registro es exitoso, se guarda el token y se establece el usuario.
            const { token, user } = body.data;
            authLoginState(token);
            setAuthUser(user);

            return body.data;
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
