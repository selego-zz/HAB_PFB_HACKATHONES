import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Importamos la función toast.
import toast from 'react-hot-toast';

// Importamos la URL del servidor.
const { VITE_API_URL } = import.meta.env;

////////////////////////////////
const RecoverPass_SendCodePage = () => {
    const [email, setEmail] = useState('');
    const [mailSent, setMailSent] = useState(false);

    // Importamos la función navigate.
    const navigate = useNavigate();

    const handleSendRecoveryMail = async (e) => {
        try {
            // Prevenimos el comportamiento por defecto del formulario.
            e.preventDefault();

            // Obtenemos una respuesta.
            const res = await fetch(`${VITE_API_URL}/users/password/recover`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                }),
            });

            // Obtenemos el body.
            const body = await res.json();

            // Si hubo algún error lo lanzamos.
            if (body.status === 'error') {
                throw new Error(body.message);
            }

            // Indicamos que ha finalizado el fetch.
            setMailSent(true);

            // Redirigimos a la página principal.
            toast.success(
                'Correo enviado, comprueba tu buzón, en breve obtendrás respuesta',
                { id: 'sendRecoverPassword' },
            );
            navigate('/');
        } catch (err) {
            toast.error(err.message, {
                id: 'sendRecoverPassword',
            });
        }
    };

    return (
        <main>
            <div className=" h-screen bg-[url('/assets/images/back-banner.jpg')] bg-cover bg-center ">
                <div className="h-full bg-blanco bg-opacity-90 flex flex-col items-center justify-center">
                    <h2 className="font-jost font-semibold text-azuloscuro text-3xl text-center m-14">
                        Recuperación de contraseña
                    </h2>
                    <p className="font-jost font-medium text-azuloscuro text-center max-w-96 m-10">
                        Si has olvidado tu contraseña, introduce tu email para
                        recuperarla.
                    </p>
                    <form
                        onSubmit={handleSendRecoveryMail}
                        className="flex flex-col items-center justify-center"
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
                        <p className="font-jost text-azuloscuro text-xs">
                            *Recibirás un email con el enlace de recuperación.
                        </p>

                        <button
                            disabled={mailSent}
                            className="button-blue mt-16"
                        >
                            Enviar correo
                        </button>
                    </form>
                </div>
            </div>
        </main>
    );
};
export default RecoverPass_SendCodePage;
