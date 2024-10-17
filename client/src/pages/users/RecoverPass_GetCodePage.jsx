// Importamos los hooks.
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

// Importamos la función toast.
import toast from 'react-hot-toast';

// Importamos la URL del servidor.
const { VITE_API_URL } = import.meta.env;

// Inicializamos el componente.
const RecoverPass_GetCodePage = () => {
    const [password, setPassword] = useState('');
    const [repeatedPassword, setRepeatedPassword] = useState('');
    const [passChanged, setPassChanged] = useState(false);
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
            <h2>Cambio de contraseña</h2>
            <p>
                Bienvenido, para cambiar tu contraseña, por favor introduce la
                nueva contraseña en la casilla indicada. Por tu seguridad, debes
                volver a introducirla en la casilla identificada como Repite tu
                contraseña, para asegurar que no te has equivocado con ninguna
                letra
            </p>
            <form onSubmit={handleChangePass}>
                <ul>
                    <li>
                        <label htmlFor="pass">Contraseña:</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </li>
                    <li>
                        <label htmlFor="repeatedPassword">
                            Repite tu contraseña:
                        </label>
                        <input
                            type="password"
                            id="repeatedPassword"
                            value={repeatedPassword}
                            onChange={(e) =>
                                setRepeatedPassword(e.target.value)
                            }
                            required
                        />
                    </li>
                    <li>
                        <button disabled={passChanged}>
                            Cambiar contraseña
                        </button>
                    </li>
                </ul>
            </form>
        </main>
    );
};

export default RecoverPass_GetCodePage;
