// Importamos los hooks.
import { useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

// Importamos la función toast.
import toast from 'react-hot-toast';
import { AuthContext } from '../../contexts/AuthContext';

// Importamos la URL del servidor.
const { VITE_API_URL } = import.meta.env;

// Inicializamos el componente.
const ValidationPage = () => {
    //importamos cerrar sesión
    const { authLogoutState } = useContext(AuthContext);

    // Importamos la función navigate.
    const navigate = useNavigate();

    // Obtenemos el path param con el código de registro.
    const { activationCode } = useParams();

    // Utilizamos "useEffect" para validar al usuario cuando se monte el componente.
    useEffect(() => {
        const fetchValidateUser = async () => {
            try {
                // Obtenemos una respuesta.
                const res = await fetch(
                    `${VITE_API_URL}/users/register/validate/${activationCode}`,
                    {
                        method: 'PATCH',
                    },
                );

                // Obtenemos el body.
                const body = await res.json();

                // Si hay algún error lo lanzamos.
                if (body.status === 'error') {
                    throw new Error(body.message);
                }

                //si validamos un nuevo usuario, cerramos la sesión de cualquiera que estuviera
                //por que validar, y que haya una sesión abierta con otro usuario puede ser confuso
                authLogoutState();

                // Si todo ha ido bien mostramos un mensaje al usuario.
                toast.success(body.message, {
                    id: 'activateUser',
                });
            } catch (err) {
                err.message === 'El usuario no existe'
                    ? console.warn('El usuario se ha activado correctamente')
                    : toast.error(err.message, {
                          id: 'activateUser',
                      });
            } finally {
                // Tanto si la activación ha sido un éxito como si no, redirigimos a login.
                navigate('/users/login');
            }
        };

        // Llamamos a la función anterior.
        fetchValidateUser();
    }, [activationCode, navigate]);

    return (
        <main>
            <h2>Página activación de usuario</h2>
        </main>
    );
};

export default ValidationPage;
