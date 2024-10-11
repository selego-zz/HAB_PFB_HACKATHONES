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

            // Redirigimos a la página principal.
            toast.success('Correo Enviado', { id: 'sendRecoverPassword' });
            navigate('/');
        } catch (err) {
            toast.error(err.message, {
                id: 'sendRecoverPassword',
            });
        } finally {
            // Indicamos que ha finalizado el fetch.
            setMailSent(true);
        }
    };

    return (
        <main>
            <h2>Recuperación de contraseña</h2>
            <p>
                Si has olvidado tu contraseña, no te preocupes, simplemente el
                correo electrónico con el que te registraste, y, si se encuentra
                reigstrado en nuestro sistema, te enviaremos un correo de
                recuperación
            </p>
            <form onSubmit={handleSendRecoveryMail}>
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <button disabled={mailSent}>Enviar correo</button>
            </form>
        </main>
    );
};
export default RecoverPass_SendCodePage;
