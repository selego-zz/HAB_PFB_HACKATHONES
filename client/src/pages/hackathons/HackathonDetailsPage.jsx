import { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../contexts/AuthContext.jsx';
import { useParams, useNavigate } from 'react-router-dom';
import { useDocumentTitle, useHackathons } from '../../hooks/index.js';
import toast from 'react-hot-toast';

const HackathonDetailsPage = () => {
    // Título de pestaña
    useDocumentTitle('Detalles del evento');

    const { hackathonId } = useParams();
    const { authToken, isOrganizer, isDeveloper, authUser } =
        useContext(AuthContext);
    const { getHackathon, deleteHackathon, getUsersHackathon } =
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
                if (oldParam === hackathonId) return;
                setOldParam(hackathonId);

                const data = await getHackathon(hackathonId);
                setHackathon(data);

                const userHackathons = await getUsersHackathon();
                const enrolledParticipants = userHackathons.filter(
                    (h) => String(h.hackathonId) === String(hackathonId),
                );

                setParticipants(enrolledParticipants || []);

                const isUserRegistered = enrolledParticipants.some(
                    (h) => h.userId === authUser?.id,
                );
                setIsRegistered(isUserRegistered);
            } catch (err) {
                err.message === 'Error: jwt malformed' ||
                err.message === 'Error: Usuario no encontrado'
                    ? console.warn(
                          'El usuario no está logeado o hubo un problema de autenticación',
                      )
                    : err.message === 'Error: No se encontraron inscripciones'
                      ? console.warn('No se encontraron inscripciones')
                      : toast.error(err.message, {
                            id: 'hackathondetailspage',
                        });
            } finally {
                setLoading(false);
            }
        };

        fetchHackathonDetails();
    }, [hackathonId, getHackathon, getUsersHackathon, oldParam, authUser?.id]);

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
            <div className="relative z-10 bg-blanco bg-opacity-90 p-8 max-w-full mx-auto rounded-lg shadow-lg">
                <h1 className="text-2xl font-bold">{hackathon?.name}</h1>
                <p>
                    <strong>Fecha de inscripción:</strong>{' '}
                    {hackathon?.inscriptionDate} - {hackathon?.inscriptionEnd}
                </p>
                <p>
                    <strong>Fecha del hackathon:</strong>{' '}
                    {hackathon?.hackathonDate} - {hackathon?.hackathonEnd}
                </p>
                <p>
                    <strong>Ubicación:</strong> {hackathon?.location}
                </p>
                <p>
                    <strong>Premios:</strong> {hackathon?.prizes}
                </p>
                <p>
                    <strong>Documentación:</strong> {hackathon?.documentation}
                </p>

                {isDeveloper() && (
                    <div className="mt-4">
                        {isRegistered ? (
                            <button
                                onClick={() =>
                                    navigate(
                                        `/hackathons/${hackathonId}/cancel`,
                                    )
                                }
                                className="bg-rojoclaro hover:bg-rojooscuro text-blanco p-2 rounded"
                            >
                                Cancelar mi inscripción
                            </button>
                        ) : (
                            <button
                                onClick={() =>
                                    navigate(
                                        `/hackathons/${hackathonId}/registration`,
                                    )
                                }
                                className="bg-azuloscuro hover:bg-verdeagua text-blanco p-2 rounded"
                            >
                                Inscríbete
                            </button>
                        )}
                    </div>
                )}

                {isOrganizer() && (
                    <div className="mt-4">
                        <button
                            onClick={() =>
                                navigate(`/hackathons/update/${hackathonId}`)
                            }
                            className="bg-verdemarino text-blanco p-2 rounded"
                        >
                            Actualizar Hackathon
                        </button>
                        <button
                            onClick={handleDelete}
                            className="ml-2 bg-rojoclaro text-blanco p-2 rounded"
                        >
                            Eliminar Hackathon
                        </button>
                    </div>
                )}

                <div className="mt-6">
                    <h2 className="text-xl font-semibold">
                        Desarrolladores inscritos
                    </h2>
                    <ul>
                        {participants.length > 0 ? (
                            participants.map((dev) => (
                                <li
                                    key={dev.id}
                                    className="flex items-center justify-between mb-2"
                                >
                                    <div className="flex items-center">
                                        <img
                                            src={dev.avatar}
                                            alt={`${dev.username} avatar`}
                                            className="w-10 h-10 rounded-full mr-2"
                                        />
                                        <p>{dev.username}</p>
                                    </div>
                                    {/* Solo mostrar las puntuaciones si el usuario es el organizador del hackathon */}
                                    {isOrganizer() &&
                                        authUser?.id ===
                                            hackathon?.organizerId && (
                                            <input
                                                type="number"
                                                placeholder="Puntuación"
                                                value={scores[dev.userId] || ''}
                                                onChange={(e) =>
                                                    handleScoreChange(
                                                        dev.userId,
                                                        e.target.value,
                                                    )
                                                }
                                                className="border p-1 rounded"
                                            />
                                        )}
                                </li>
                            ))
                        ) : (
                            <p>No hay desarrolladores inscritos.</p>
                        )}
                    </ul>
                </div>

                {/* Sección de puntuaciones solo para el organizador del hackathon */}
                {isOrganizer() && authUser?.id === hackathon?.organizerId && (
                    <button
                        onClick={handleSubmitScores}
                        className="mt-4 bg-verdeclaro text-blanco p-2 rounded"
                    >
                        Guardar puntuaciones
                    </button>
                )}
            </div>
        </div>
    );
};

export default HackathonDetailsPage;
