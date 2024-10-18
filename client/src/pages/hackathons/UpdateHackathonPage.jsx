import { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../contexts/AuthContext.jsx';
import { useNavigate, useParams } from 'react-router-dom';

import toast from 'react-hot-toast';

import { CreateHackathonForm } from '../../forms/index.js';
import { useHackathons, useDocumentTitle } from '../../hooks/index.js';

//////

const UpdateHackathonPage = () => {
    // Título de pestaña
    useDocumentTitle('Actualización de datos del hackathon ');

    const { hackathonId } = useParams();

    const { authUser, authLoading } = useContext(AuthContext);
    const navigate = useNavigate();
    const { getHackathon, updateHackathon } = useHackathons();

    const [hackathon, setHackathon] = useState();
    // Estado para los datos del formulario
    const [formData, setFormData] = useState(null);

    // Verificación de acceso al cargar el componente
    useEffect(() => {
        const initialize = async () => {
            if (authLoading) return;
            let tempHackathon = await getHackathon(hackathonId);
            if (!hackathon) setHackathon(tempHackathon);

            const tempFormData = {
                name: tempHackathon.name,
                inscriptionDate: tempHackathon.inscriptionDate,
                inscriptionEnd: tempHackathon.inscriptionEnd,
                hackathonDate: tempHackathon.hackathonDate,
                hackathonEnd: tempHackathon.hackathonEnd,
                maxParticipants: tempHackathon.maxParticipants,
                online: tempHackathon.online,
                location: tempHackathon.location,
                prizes: tempHackathon.prizes,
                logo: tempHackathon.logo,
                documentation: tempHackathon.documentation,
                requirements: tempHackathon.requirements,
                description: tempHackathon.description,
            };

            if (formData === null) setFormData(tempFormData);
            if (!authUser || authUser.id !== tempHackathon.organizerId) {
                toast.error('No tienes permisos para modificar este hackathon');
                navigate('/');
            }
        };
        initialize();
    }, [
        hackathon,
        getHackathon,
        hackathonId,
        authUser,
        authLoading,
        navigate,
        formData,
    ]);

    // Manejador de cambios en el formulario
    const handleChange = (e) => {
        let { name, value } = e.target;

        if (name === 'logo' || name === 'documentation')
            value = e.target.files[0];

        const newFormData = { ...formData, [name]: value };

        setFormData(newFormData);
    };

    // Manejador de envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            formData.id = hackathon.id;
            const res = await updateHackathon(formData);
            toast.success(res);
            navigate('/');
        } catch (err) {
            toast.error(err.message);
        }
    };

    if (!authUser) {
        return null;
    }

    if (!formData) {
        return null;
    }

    return (
        <div className="bg-[url('/assets/images/back-banner.jpg')] inset-0 bg-cover bg-center z-0">
            <div className="relative z-10 bg-blanco bg-opacity-90 p-8 max-w-full mx-auto rounded-lg shadow-lg">
                <CreateHackathonForm
                    formData={formData}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    buttonMessage={'Actualizar hackathon'}
                    forceDate={true}
                />
            </div>
        </div>
    );
};

export default UpdateHackathonPage;
