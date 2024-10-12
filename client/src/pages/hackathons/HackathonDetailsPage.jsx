import { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../contexts/AuthContext.jsx';
import { useParams, useNavigate } from 'react-router-dom';
import { useDocumentTitle, useHackathons } from '../../hooks/index.js';
import toast from 'react-hot-toast';
import HackathonDetails from '../../components/HackathonDetails.jsx';

//////

const HackathonDetailsPage = () => {
    useDocumentTitle('Detalles del evento');

    const { hackathonId } = useParams();
    const { authToken, isOrganizer, isDeveloper, authUser } =
        useContext(AuthContext);
    const { getHackathon, deleteHackathon, getAllInscriptionsFromAHackathon } =
        useHackathons();

    const [hackathon, setHackathon] = useState(null);
    const [participants, setParticipants] = useState([]);
    const [oldParam, setOldParam] = useState('');
    const [isRegistered, setIsRegistered] = useState(false);
    const [scores, setScores] = useState({});
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchHackathonDetails = async () => {
            try {
                // Para que refresque la página si cambia el id
                if (oldParam === hackathonId) return;
                setOldParam(hackathonId);

                // Solicitamos los datos del hackathon
                const data = await getHackathon(hackathonId);
                setHackathon(data);

                // Solicitamos usuarios inscritos
                const userHackathons =
                    await getAllInscriptionsFromAHackathon(hackathonId);
                const enrolledParticipants = userHackathons.filter(
                    (h) => String(h.hackathonId) === String(hackathonId),
                );

                setParticipants(enrolledParticipants || []);

                // Comprobación para ver si el usuario que ve la página está inscrito en ese hackathon
                const isUserRegistered = enrolledParticipants.some(
                    (h) => h.userId === authUser?.id,
                );
                setIsRegistered(isUserRegistered);
            } catch (err) {
                toast.error(err.message, {
                    id: 'hackathondetailspage',
                });
                navigate('/hackathons');
            } finally {
                setLoading(false);
            }
        };
        fetchHackathonDetails();
    }, [
        hackathonId,
        getHackathon,
        getAllInscriptionsFromAHackathon,
        oldParam,
        authUser?.id,
        navigate,
    ]);

    const handleDelete = async () => {
        if (confirm('¿Estás seguro de que quieres eliminar este hackathon?')) {
            try {
                await deleteHackathon(hackathonId);
                toast.success('Hackathon eliminado');
                navigate('/');
            } catch (err) {
                toast.error(err.message, { id: 'hackathondetailspage' });
            }
        }
    };

    const handleScoreChange = (userId, score) => {
        setScores((prev) => ({
            ...prev,
            [userId]: score,
        }));
    };

    const handleSubmitScores = async () => {
        try {
            for (const userId in scores) {
                const score = scores[userId];

                const res = await fetch(
                    `${import.meta.env.VITE_API_URL}/hackathons/${hackathonId}/ranking`,
                    {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: authToken,
                        },
                        body: JSON.stringify({ developerId: userId, score }),
                    },
                );

                const body = await res.json();
                if (body.status === 'error') throw new Error(body.message);
            }
            toast.success('Puntuaciones guardadas');
        } catch (err) {
            console.error('Error al enviar puntuaciones:', err);
            toast.error(err.message, { id: 'hackathondetailspage' });
        }
    };

    if (loading) {
        return <div>Cargando...</div>;
    }

    return (
        <div className="bg-[url('/assets/images/back-banner.jpg')] inset-0 bg-cover bg-center z-0">
            <HackathonDetails
                hackathon={hackathon}
                participants={participants}
                isRegistered={isRegistered}
                isDeveloper={isDeveloper}
                isOrganizer={isOrganizer}
                handleDelete={handleDelete}
                handleScoreChange={handleScoreChange}
                handleSubmitScores={handleSubmitScores}
                scores={scores}
                authUser={authUser}
                hackathonId={hackathonId}
            />
        </div>
    );
};

export default HackathonDetailsPage;
