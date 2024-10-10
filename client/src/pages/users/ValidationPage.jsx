import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const ValidationPage = () => {
    const [code, setCode] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        const validCode = '123456';

        if (code === validCode) {
            toast.success('¡Código verificado exitosamente!');
            setTimeout(() => {
                navigate('/login'); // Redirige a la página de login
            }, 2000);
        } else {
            toast.error('Código incorrecto. Inténtalo de nuevo.');
        }
    };

    return (
        <div className="validation-container">
            <h2>Validación de Código</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="code">
                        Ingresa el código de validación:
                    </label>
                    <input
                        type="text"
                        id="code"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        required
                    />
                </div>
                <button>Validar Código</button>
            </form>
        </div>
    );
};

export default ValidationPage;
