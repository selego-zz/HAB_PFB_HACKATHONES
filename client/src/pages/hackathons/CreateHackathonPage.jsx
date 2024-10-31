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
        requirements: '',
        description: '',
        technologies: [],
        themes: [],
    });

    // Verificación de acceso al cargar el componente
    useEffect(() => {
        if (authLoading) return;
        if (!authUser || !isOrganizer()) {
            toast.error('Solo los organizadores pueden añadir hackathons');
            navigate('/');
        }
    }, [authUser, authLoading, isOrganizer, navigate]);

    // Manejador de cambios en el formulario
    const handleChange = (e) => {
        let { name, value } = e.target;
        if (name === 'logo' || name === 'documentation')
            value = e.target.files[0];
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Manejo de tecnologías
    const handleTechnologyChange = (e) => {
        const { value } = e.target;
        const fD = { ...formData };

        // formData?.technologies.indexOf((t) => t.technology === value);

        const index = fD.technologies.findIndex((t) => t.technology === value);

        if (index === -1) fD.technologies.push({ technology: value });
        else fD.technologies.splice(index, 1);

        setFormData(fD);
    };

    // Manejo de temas
    const handleThemeChange = (e) => {
        const { value } = e.target;
        const fD = { ...formData };

        const index = fD.themes.findIndex((t) => t.theme === value);
        if (index === -1) fD.themes.push({ theme: value });
        else fD.themes.splice(index, 1);

        setFormData(fD);
    };

    // Manejador de envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await addHackathon(formData);
            toast.success(res);
            navigate('/users');
        } catch (err) {
            toast.error(err.message);
        }
    };

    if (!authUser || !isOrganizer()) {
        return null;
    }

    return (
        <div className="min-h-screen bg-[url('/assets/images/back-banner.jpg')] bg-cover bg-center">
            <div className="min-h-screen bg-blanco bg-opacity-90">
                <CreateHackathonForm
                    formData={formData}
                    handleChange={handleChange}
                    handleTechnologyChange={handleTechnologyChange}
                    handleThemeChange={handleThemeChange}
                    handleSubmit={handleSubmit}
                    buttonMessage={'Añadir hackathon'}
                />
            </div>
        </div>
    );
};

export default CreateHackathonPage;
