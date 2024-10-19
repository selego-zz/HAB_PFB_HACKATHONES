// Importamos hooks
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDocumentTitle } from '../../hooks/index.js';

// Importamos contexts
import { AuthContext } from '../../contexts/AuthContext.jsx';

import toast from 'react-hot-toast';

/////////////////////////////////

const RegisterPage = () => {
    // Título de pestaña
    useDocumentTitle('Registro');

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        password: '',
        role: 'desarrollador', // Valor por defecto
    });

    const { registerUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Comprobamos que las contraseñas coincidan
            const { password } = formData;
            if (password !== formData.repeatpassword) {
                throw new Error('Las contraseñas no coinciden');
            }

            // Creamos un nuevo objeto de datos sin repeatpassword
            // eslint-disable-next-line no-unused-vars
            const { repeatpassword, ...dataToSend } = formData;

            // Enviamos los datos necesarios
            await registerUser(dataToSend);

            // Mostrar mensaje basado en el rol
            if (formData.role === 'desarrollador') {
                toast.success(
                    'Usuario registrado. En breve recibirás un enlace de verificación en tu correo electrónico.',
                    { id: 'registro' },
                );
            } else if (formData.role === 'organizador') {
                toast.success(
                    '¡Gracias! El administrador revisará tu solicitud de registro lo antes posible.',
                    { id: 'registro' },
                );
            }

            setTimeout(() => {
                navigate('/');
            }, 500);
        } catch (err) {
            toast.error(err.message, { id: 'registro' });
        }
    };

    return (
        <div className="bg-[url('/assets/images/back-banner.jpg')] bg-cover bg-center ">
            <div className=" bg-blanco bg-opacity-90">
                <div className="max-w-4xl mx-auto py-8 px-4">
                    <h2 className="text-center text-3xl font-jost font-semibold text-azuloscuro mb-10">
                        REGÍSTRATE
                    </h2>
                    <form
                        onSubmit={handleSubmit}
                        className="flex flex-col gap-8 sm:grid sm:grid-cols-2"
                    >
                        <div className="min-w-[200px]">
                            <label className="label">Nombre:</label>
                            <input
                                type="text"
                                id="firstName"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                className="input"
                                required
                                autoFocus
                            />
                        </div>

                        <div className="min-w-[200px]">
                            <label className="label">Apellido:</label>
                            <input
                                type="text"
                                id="lastName"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                className="input"
                                required
                            />
                        </div>

                        <div className="min-w-[200px]">
                            <label className="label">Nombre de usuario:</label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                className="input"
                                required
                            />
                        </div>

                        <div className="min-w-[200px]">
                            <label className="label">Email:</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-80 h-11 rounded-3xl bg-casiblanco block mx-auto text-center text-azuloscuro font-jost font-medium focus:border-azuloscuro focus:outline-none focus:bg-verdeclaro focus:ring-azuloscuro focus:ring-2"
                                required
                            />
                        </div>

                        <div className="min-w-[200px]">
                            <label className="label">Contraseña:</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-80 h-11 rounded-3xl bg-casiblanco block mx-auto text-center text-azuloscuro font-jost font-medium focus:border-azuloscuro focus:outline-none focus:bg-verdeclaro focus:ring-azuloscuro focus:ring-2"
                                required
                            />
                        </div>

                        <div className="min-w-[200px]">
                            <label className="label">Repetir Contraseña:</label>
                            <input
                                type="password"
                                id="repeatpassword"
                                name="repeatpassword"
                                onChange={handleChange}
                                className="w-80 h-11 rounded-3xl bg-casiblanco block mx-auto text-center text-azuloscuro font-jost font-medium focus:border-azuloscuro focus:outline-none focus:bg-verdeclaro focus:ring-azuloscuro focus:ring-2"
                                required
                            />
                        </div>

                        {/* Campo de selección de rol */}
                        <div className="min-w-[200px] col-span-2 flex flex-col items-center m-7">
                            <label className="label mb-5">
                                Me quiero registrar como...
                            </label>
                            <div className="flex gap-4">
                                <label className="inline-flex items-center">
                                    <input
                                        type="radio"
                                        name="role"
                                        value="desarrollador"
                                        checked={
                                            formData.role === 'desarrollador'
                                        }
                                        onChange={handleChange}
                                        className="form-radio h-4 w-4"
                                    />
                                    <span className="ml-1 text-azuloscuro font-jost font-semibold">
                                        Desarrollador
                                    </span>
                                </label>
                                <label className="inline-flex items-center">
                                    <input
                                        type="radio"
                                        name="role"
                                        value="organizador"
                                        checked={
                                            formData.role === 'organizador'
                                        }
                                        onChange={handleChange}
                                        className="form-radio h-4 w-4"
                                    />
                                    <span className="ml-1 text-azuloscuro font-jost font-semibold">
                                        Organizador
                                    </span>
                                </label>
                            </div>
                        </div>

                        <div className="col-span-2">
                            <button className="button-blue">Registrarse</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
