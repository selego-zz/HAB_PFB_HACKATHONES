// Importamos los hooks.
import { useContext, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

// Importamos la función toast.
import toast from 'react-hot-toast';
import { AuthContext } from '../../contexts/AuthContext';

// Importamos la URL del servidor.
const { VITE_API_URL } = import.meta.env;

// Inicializamos el componente.
const RecoverPass_GetCodePage = () => {
    const [password, setPassword] = useState('');
    const [repeatedPassword, setRepeatedPassword] = useState('');
    const [passChanged, setPassChanged] = useState(false);
    const { authLogoutState } = useContext(AuthContext);
    // Importamos la función navigate.
    const navigate = useNavigate();

    // Obtenemos el path param con el código de registro.
    const { recoverPassCode } = useParams();

    const handleChangePass = async (e) => {
        e.preventDefault();
        try {
            if (password !== repeatedPassword) {
                throw new Error('Las contraseñas no coinciden');
            }
            // Obtenemos una respuesta.
            const res = await fetch(
                `${VITE_API_URL}/users/password/recover/${recoverPassCode}`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        password,
                    }),
                },
            );

            // Obtenemos el body.
            const body = await res.json();

            // Si hay algún error lo lanzamos.
            if (body.status === 'error') {
                throw new Error(body.message);
            }

            setPassChanged(true);
            authLogoutState();

            // Redirigimos a la página principal.
            toast.success('Contraseña actualizada', {
                id: 'getRecoverPassword',
            });
            navigate('/users/login');
        } catch (err) {
            toast.error(err.message, {
                id: 'getRecoverPassword',
            });
        }
    };

    return (
        <main>
            <div className="font-jost h-screen bg-[url('/assets/images/back-banner.jpg')] bg-cover bg-center ">
                <div className="h-full bg-blanco bg-opacity-90 flex flex-col items-center justify-center">
                    <h2 className="font-jost font-semibold text-azuloscuro text-3xl text-center m-14">
                        Cambio de contraseña
                    </h2>
                    <p className="font-jost font-medium text-azuloscuro text-center max-w-96 m-10">
                        Introduce tu nueva contraseña.
                    </p>
                    <form
                        onSubmit={handleChangePass}
                        className="flex flex-col justify-center items-center"
                    >
                        <ul>
                            <li>
                                <label htmlFor="pass" className="label">
                                    Contraseña:
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    className="input mb-12"
                                    required
                                    autoFocus
                                />
                            </li>
                            <li>
                                <label
                                    htmlFor="repeatedPassword"
                                    className="label"
                                >
                                    Repite tu contraseña:
                                </label>
                                <input
                                    type="password"
                                    id="repeatedPassword"
                                    value={repeatedPassword}
                                    onChange={(e) =>
                                        setRepeatedPassword(e.target.value)
                                    }
                                    className="input mb-12"
                                    required
                                />
                            </li>
                            <li>
                                <button
                                    disabled={passChanged}
                                    className="button-blue mt-16"
                                >
                                    Cambiar contraseña
                                </button>
                            </li>
                        </ul>
                    </form>
                </div>
            </div>
        </main>
    );
};

export default RecoverPass_GetCodePage;
