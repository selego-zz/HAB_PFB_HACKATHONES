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
  // Declaramos una variable en el state para manejar el token. Tratamos de obtener el valor del almacenamiento local. Si no existe, establecemos un valor null.
  const [authToken, setAuthToken] = useState(
    localStorage.getItem(VITE_AUTH_TOKEN) || null
  );

  // Declaramos una variable en el State para almacenar los datos del usuario.
  const [authUser, setAuthUser] = useState(null);

  // Solicitamos los datos del usuario si existe un token.
  useEffect(() => {
    // Función que obtiene los datos del usuario.
    const fetchUser = async () => {
      try {
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
      }
    };

    // Si existe un token, buscamos los datos del usuario.
    if (authToken) {
      fetchUser();
    } else {
      // Vaciamos los datos del usuario.
      setAuthUser(null);
    }
  }, [authToken]);

  // Función que guarda el token.
  const authLoginState = (token) => {
    // Guardamos el token en el State.
    setAuthToken(token);

    // Guardamos el token en el localStorage.
    localStorage.setItem(VITE_AUTH_TOKEN, token);
  };

  // Función que elimina el token.
  const authLogoutState = () => {
    setAuthToken(null);
    localStorage.removeItem(VITE_AUTH_TOKEN);
  };

  // Función que actualiza el avatar en el State.
  const authUpdateAvatarState = (avatar) => {
    // Para que React refresque el componente con el nuevo avatar tenemos que introducir un nuevo objeto.
    setAuthUser({
      ...authUser,
      avatar,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        authToken,
        authUser,
        authLoginState,
        authLogoutState,
        authUpdateAvatarState,
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
