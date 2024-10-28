// Importamos los hooks.
import { useContext, useState } from 'react';
import { Navigate, NavLink, useNavigate } from 'react-router-dom';
import { useDocumentTitle } from '../../hooks';

// Importamos el contexto.
import { AuthContext } from '../../contexts/AuthContext.jsx';

// Importamos la función toast.
import toast from 'react-hot-toast';

// Importamos la URL del servidor.
const { VITE_API_URL } = import.meta.env;

//////////////////////////////////////////////////////////////////////

// Inicializamos el componente.
const LoginPage = () => {
    // Titulo de pestaña
    useDocumentTitle('Iniciar sesión');

    // Importamos los datos del usuario y la función que almacena el token.
    const { authUser, authLoginState } = useContext(AuthContext);

    // Importamos la función navigate.
    const navigate = useNavigate();

    // Declaramos una variable en el State para definir el valor de cada input.
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Variable que indica cuando termina el fetch.
    const [loading, setLoading] = useState(false);

    // Función que maneje el envío del formulario.
    const handleLoginUser = async (e) => {
        try {
            // Prevenimos el comportamiento por defecto del formulario.
            e.preventDefault();

            // Indicamos que va a dar comienzo el fetch.
            setLoading(true);

            // Obtenemos una respuesta.
            const res = await fetch(`${VITE_API_URL}/users/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            });

            // Obtenemos el body.
            const body = await res.json();

            // Si hubo algún error lo lanzamos.
            if (body.status === 'error') {
                throw new Error(body.message);
            }

            // Almacenamos el token en el State y en el localStorage.
            authLoginState(body.data.token);

            // Redirigimos a la página principal.
            toast.success('Bienvenido');
            navigate('/');
        } catch (err) {
            toast.error(err.message, {
                id: 'login',
            });
        } finally {
            // Indicamos que ha finalizado el fetch.
            setLoading(false);
        }
    };

    // Si estamos logeados restringimos el acceso redirigiendo a la página principal.
    // En este caso utilizaremos el componente Navigate (en lugar de la función).
    if (authUser) {
        return <Navigate to="/" />;
    }

    return (
        <main>
            <div className=" h-screen bg-[url('/assets/images/back-banner.jpg')] bg-cover bg-center ">
                <div className="h-full bg-blanco bg-opacity-90 flex flex-col items-center justify-center">
                    <h2 className="font-jost font-semibold text-azuloscuro text-3xl text-center m-14">
                        INICIAR SESIÓN
                    </h2>

                    <form
                        onSubmit={handleLoginUser}
                        className="flex flex-col justify-center items-center"
                    >
                        <label htmlFor="email" className="label">
                            Email:
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="input mb-12"
                            required
                            autoFocus
                        />

                        <label htmlFor="pass" className="label">
                            Contraseña:
                        </label>
                        <input
                            type="password"
                            id="pass"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="input"
                            required
                        />

                        {/* Habilitamos o deshabilitamos el botón en función de si estamos haciendo un fetch o no. */}
                        <button
                            disabled={loading}
                            className="button-blue mt-16"
                        >
                            Iniciar Sesión
                        </button>
                    </form>
                    <NavLink
                        to="/users/recover"
                        className="block text-azuloscuro hover:text-negro font-jost font-semibold text-center text-md mt-5 "
                    >
                        ¿Has olvidado tu contraseña? <br /> Pulsa aquí para
                        cambiarla.
                    </NavLink>
                </div>
            </div>
        </main>
    );
};

export default LoginPage;
