import { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../contexts/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';

import toast from 'react-hot-toast';

import { CreateHackathonForm } from '../../forms/index.js';
import { useHackathons, useDocumentTitle } from '../../hooks/index.js';

//////

const CreateHackathonPage = () => {
    // Título de pestaña
    useDocumentTitle('Crea un Hackathon');

    const { authUser, authLoading, isOrganizer } = useContext(AuthContext);
    const navigate = useNavigate();
    const { addHackathon } = useHackathons();

    // Estado para los datos del formulario
    const [formData, setFormData] = useState({
        name: '',
        inscriptionDate: '',
        inscriptionEnd: '',
        hackathonDate: '',
        hackathonEnd: '',
        maxParticipants: '',
        online: 'presencial', // Valor por defecto
        location: '',
        prizes: '',
        logo: '',
        documentation: '',
    });

    // Verificación de acceso al cargar el componente
    useEffect(() => {
        if (authLoading) return;
        if (!authUser || !isOrganizer()) {
            toast.error('Solo los organizadores pueden crear hackathons');
            navigate('/');
        }
    }, [authUser, authLoading, isOrganizer, navigate]);

    // Manejador de cambios en el formulario
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Manejador de envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await addHackathon(formData);
            toast.success(res);
            navigate('/');
        } catch (err) {
            toast.error(err.message);
        }
    };

    if (!authUser || !isOrganizer()) {
        return null;
    }

    return (
        <div className="bg-[url('/assets/images/back-banner.jpg')] inset-0 bg-cover bg-center z-0">
            <div className="relative z-10 bg-blanco bg-opacity-90 p-8 max-w-full mx-auto rounded-lg shadow-lg">
                <CreateHackathonForm
                    formData={formData}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                />
            </div>
        </div>
    );
};

export default CreateHackathonPage;
