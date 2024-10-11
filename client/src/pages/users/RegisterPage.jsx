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
        repeatpassword: '', // Solo lo utilizamos en el frontend
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

        const { password, repeatpassword, ...dataToSend } = formData; // Excluir repeatpassword

        try {
            if (password !== repeatpassword) {
                throw new Error('Las contraseñas no coinciden');
            }

            // Enviar solo los datos necesarios (sin repeatpassword)
            await registerUser(dataToSend);

            toast.success(
                '¡Gracias! En breve recibirás un correo de validación.',
                { id: 'registro' },
            );

            setTimeout(() => {
                navigate('/');
            }, 2000);
        } catch (err) {
            toast.error(
                err.message ||
                    'Hubo un error en el registro, inténtalo de nuevo más tarde.',
                { id: 'registro' },
            );
        }
    };

    return (
        <div className="max-w-4xl mx-auto py-8 px-4">
            <h2 className="text-center text-2xl font-bold text-gray-700 mb-6">
                Registro de Usuario
            </h2>
            <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-4 sm:grid sm:grid-cols-2"
            >
                <div className="min-w-[200px]">
                    <label className="block text-sm font-medium text-gray-700 mx-2">
                        Nombre
                    </label>
                    <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        className="mt-1 block w-11/12 mx-auto border-gray-300 rounded-md shadow-sm bg-verdeclaro p-2"
                        required
                    />
                </div>

                <div className="min-w-[200px]">
                    <label className="block text-sm font-medium text-gray-700 mx-2">
                        Apellido
                    </label>
                    <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className="mt-1 block w-11/12 mx-auto border-gray-300 rounded-md shadow-sm bg-verdeclaro p-2"
                        required
                    />
                </div>

                <div className="min-w-[200px]">
                    <label className="block text-sm font-medium text-gray-700 mx-2">
                        Nombre de usuario
                    </label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        className="mt-1 block w-11/12 mx-auto border-gray-300 rounded-md shadow-sm bg-verdeclaro p-2"
                        required
                    />
                </div>

                <div className="min-w-[200px]">
                    <label className="block text-sm font-medium text-gray-700 mx-2">
                        Correo Electrónico
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="mt-1 block w-11/12 mx-auto border-gray-300 rounded-md shadow-sm bg-verdeclaro p-2"
                        required
                    />
                </div>

                <div className="min-w-[200px]">
                    <label className="block text-sm font-medium text-gray-700 mx-2">
                        Contraseña
                    </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="mt-1 block w-11/12 mx-auto border-gray-300 rounded-md shadow-sm bg-verdeclaro p-2"
                        required
                    />
                </div>

                <div className="min-w-[200px]">
                    <label className="block text-sm font-medium text-gray-700 mx-2">
                        Repetir Contraseña
                    </label>
                    <input
                        type="password"
                        id="repeatpassword"
                        name="repeatpassword"
                        value={formData.repeatpassword}
                        onChange={handleChange}
                        className="mt-1 block w-11/12 mx-auto border-gray-300 rounded-md shadow-sm bg-verdeclaro p-2"
                        required
                    />
                </div>

                {/* Campo de selección de rol */}
                <div className="min-w-[200px] col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mx-2 mb-2">
                        Me quiero registrar como...
                    </label>
                    <div className="flex gap-4">
                        <label className="inline-flex items-center">
                            <input
                                type="radio"
                                name="role"
                                value="desarrollador"
                                checked={formData.role === 'desarrollador'}
                                onChange={handleChange}
                                className="form-radio"
                            />
                            <span className="ml-2">Desarrollador</span>
                        </label>
                        <label className="inline-flex items-center">
                            <input
                                type="radio"
                                name="role"
                                value="organizador"
                                checked={formData.role === 'organizador'}
                                onChange={handleChange}
                                className="form-radio"
                            />
                            <span className="ml-2">Organizador</span>
                        </label>
                    </div>
                </div>

                <div className="col-span-2">
                    <button className="mt-4 font-bold bg-verdeagua py-2 px-4 rounded-lg hover:bg-verdemarino w-1/3 mx-auto block">
                        Registrarse
                    </button>
                </div>
            </form>
        </div>
    );
};

export default RegisterPage;
