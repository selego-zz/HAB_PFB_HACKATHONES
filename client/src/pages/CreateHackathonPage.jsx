import { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../contexts/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

import CreateHackathonForm from '../forms/CreateHackathonForm.jsx'; // Importamos el formulario
import useHackathons from '../hooks/useHackathons.js';

//////

const CreateHackathonPage = () => {
    const { authUser, isOrganizer } = useContext(AuthContext);
    const navigate = useNavigate();

    const { addHackathon } = useHackathons;

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
        if (!authUser || !isOrganizer()) {
            toast.error('Solo los organizadores pueden crear hackathons');
            navigate('/');
        }
    }, [authUser, isOrganizer, navigate]);

    // Manejador de cambios en el formulario
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Manejador de envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            addHackathon(formData);

            toast.success('Hackathon creado exitosamente');
            navigate('/');
        } catch (err) {
            toast.error(`Error: ${err.message}`);
        }
    };

    if (!authUser || !isOrganizer()) {
        return null;
    }

    return (
        <CreateHackathonForm
            formData={formData}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
        />
    );
};

export default CreateHackathonPage;
