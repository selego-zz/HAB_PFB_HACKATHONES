import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
const { VITE_API_URL } = import.meta.env;

////////////////////////////

const LoginPage = () => {
    const [credentials, setCredentials] = useState({
        email: '',
        password: '',
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        //
        const { email, password } = credentials;
        try {
            const res = await fetch(`${VITE_API_URL}/users/login`);
            const body = await res.json();

            if (body.status === 'error') {
                throw new Error(body.message);
            }

            if (email === 'user' && password === 'password') {
                toast.success('¡Login exitoso!');
                setTimeout(() => {
                    navigate('/'); // Redirige a la página principal o al dashboard
                }, 2000);
            } else {
                toast.error('Credenciales incorrectas. Inténtalo de nuevo.');
            }
        } catch (err) {
            toast.error(err.message);
        }

        return (
            <div className="login-container">
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Correo electrónico:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={credentials.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Contraseña:</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={credentials.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit">Iniciar sesión</button>
                </form>
            </div>
        );
    };
};
export default LoginPage;
