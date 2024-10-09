import { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../contexts/AuthContext.jsx';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';

import {
    useHackathonParticipants,
    useDocumentTitle,
} from '../../hooks/index.js'; // Hook para obtener los participantes

//////

const PublishRankingPage = () => {
    useDocumentTitle('Puntuaciones'); // Título de pestaña

    const { authUser, authLoading, isOrganizer } = useContext(AuthContext);
    const { hackathonId } = useParams(); // Obtenemos el ID del hackathon desde la URL
    const navigate = useNavigate();
    const { participants, updateParticipantScore } =
        useHackathonParticipants(hackathonId); // Hook que maneja participantes y puntuación

    const [scores, setScores] = useState({});

    // Verificación de acceso al cargar el componente
    useEffect(() => {
        if (authLoading) return;
        if (!authUser || !isOrganizer()) {
            toast.error(
                'Solo los organizadores pueden publicar la clasificación',
            );
            navigate('/');
        }
    }, [authUser, authLoading, isOrganizer, navigate]);

    // Manejador de cambios en las puntuaciones
    const handleScoreChange = (e, participantId) => {
        const { value } = e.target;
        setScores((prev) => ({ ...prev, [participantId]: value }));
    };

    // Manejador de envío de la clasificación
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Iteramos sobre cada participante y actualizamos su puntuación
            for (const participantId of Object.keys(scores)) {
                await updateParticipantScore(
                    participantId,
                    scores[participantId],
                );
            }
            toast.success('Clasificación publicada exitosamente');
            navigate(`/hackathons/${hackathonId}`);
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
                <h2 className="text-2xl font-bold mb-6">
                    Publicar Clasificación
                </h2>
                <form onSubmit={handleSubmit}>
                    {participants.map((participant) => (
                        <div key={participant.id} className="mb-4">
                            <label className="block text-lg mb-2">
                                {participant.name} ({participant.email})
                            </label>
                            <input
                                type="number"
                                name={`score-${participant.id}`}
                                value={scores[participant.id] || ''}
                                onChange={(e) =>
                                    handleScoreChange(e, participant.id)
                                }
                                className="w-full p-2 border rounded"
                                placeholder="Introduce la puntuación"
                                required
                            />
                        </div>
                    ))}
                    <button
                        type="submit"
                        className="bg-azul text-blanco px-4 py-2 rounded-lg"
                    >
                        Publicar Clasificación
                    </button>
                </form>
            </div>
        </div>
    );
};

export default PublishRankingPage;
