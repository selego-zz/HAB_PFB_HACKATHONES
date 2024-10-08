//importamos hooks
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

//importamos contexts
import { AuthContext } from '../contexts/AuthContext';

import toast from 'react-hot-toast';

/////////////////////////////////
const RegisterPage = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        password: '',
        repeatpassword: '',
    });
    //const { registerUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { password, repeatpassword } = formData;

        try {
            if (password !== repeatpassword)
                throw new Error('Las contraseñas no coinciden');
            //registerUser(formData);
            toast.success(
                'Te has registrado! Redirigiendo a la validación...',
                { id: 'registro' },
            );

            setTimeout(() => {
                navigate('/');
            }, 2000);
        } catch (error) {
            toast.error(error.message || 'Hubo un error en el registro.', {
                id: 'registro',
            });
        }
    };

    return (
        <div className="register-container">
            <h2>Registro</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="firstName">Nombre:</label>
                    <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="lastName">Apellido:</label>
                    <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="username">Nombre de usuario:</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Correo Electrónico:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
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
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="repeatpassword">Contraseña:</label>
                    <input
                        type="password"
                        id="repeatpassword"
                        name="repeatpassword"
                        value={formData.repeatpassword}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Registrarse</button>
            </form>
        </div>
    );
};
export default RegisterPage;
