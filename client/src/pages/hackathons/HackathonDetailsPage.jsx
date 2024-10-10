import { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../contexts/AuthContext.jsx';

import { useParams, useNavigate } from 'react-router-dom';

import { useDocumentTitle, useHackathons } from '../../hooks/index.js';

import toast from 'react-hot-toast';

//////

const HackathonDetailsPage = () => {
    // Título de pestaña
    useDocumentTitle('Detalles del evento');

    const { hackathonId } = useParams();
    const { authToken, isOrganizer, isDeveloper } = useContext(AuthContext);
    const { getHackathon, deleteHackathon, getUsersHackathon } =
        useHackathons();

    const [hackathon, setHackathon] = useState(null);
    const [participants, setParticipants] = useState([]);
    const [oldParam, setOldParam] = useState('');
    const [scores, setScores] = useState({});
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchHackathonDetails = async () => {
            try {
                // Evitamos que se actualice infinitamente mientras no cambie el id de hackathon
                if (oldParam === hackathonId) return;
                setOldParam(hackathonId);

                const data = await getHackathon(hackathonId);
                setHackathon(data);

                // Llamada para obtener los participantes inscritos
                const userHackathons = await getUsersHackathon();
                console.log(userHackathons);

                const enrolledParticipants = userHackathons.find(
                    (h) => h.hackathonId == hackathonId,
                );
                console.log(enrolledParticipants);

                setParticipants(enrolledParticipants || []);
            } catch (err) {
                toast.error(err.message, { id: 'hackathondetailspage' });
            } finally {
                setLoading(false);
            }
        };

        fetchHackathonDetails();
    }, [hackathonId, getHackathon, getUsersHackathon, oldParam]);

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

    const handleScoreChange = (devId, score) => {
        setScores((prev) => ({
            ...prev,
            [devId]: score,
        }));
    };

    const handleSubmitScores = async () => {
        try {
            for (const developerId in scores) {
                const score = scores[developerId];

                const res = await fetch(
                    `${import.meta.env.VITE_API_URL}/hackathons/${hackathonId}/${developerId}/ranking`,
                    {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: authToken,
                        },
                        body: JSON.stringify({ score }),
                    },
                );
                const body = await res.json();

                if (body.status === 'error') throw new Error(body.message);
            }
            toast.success('Puntuaciones guardadas');
        } catch (err) {
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

                {/* Botones de acción */}
                {isDeveloper() && (
                    <button className="mt-4 bg-blue-500 text-blanco p-2 rounded">
                        Inscríbete
                    </button>
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

                {/* Sección de puntuaciones solo para organizadores */}
                {isOrganizer() && (
                    <div className="mt-6">
                        <h2 className="text-xl font-semibold">
                            Desarrolladores Inscritos
                        </h2>
                        <ul>
                            {participants.length > 0 ? (
                                participants.map((dev) => (
                                    <li
                                        key={dev.id}
                                        className="flex items-center justify-between"
                                    >
                                        <p>{dev.username}</p>
                                        <input
                                            type="number"
                                            placeholder="Puntuación"
                                            value={scores[dev.id] || ''}
                                            onChange={(e) =>
                                                handleScoreChange(
                                                    dev.id,
                                                    e.target.value,
                                                )
                                            }
                                        />
                                    </li>
                                ))
                            ) : (
                                <p>No hay desarrolladores inscritos.</p>
                            )}
                        </ul>
                        <button
                            onClick={handleSubmitScores}
                            className="mt-4 bg-verdeclaro text-blanco p-2 rounded"
                        >
                            Guardar Puntuaciones
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default HackathonDetailsPage;
