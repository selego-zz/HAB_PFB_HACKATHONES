import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const formatDate = (dateStr) => {
    const options = { day: 'numeric', month: 'short', year: '2-digit' };
    return new Date(dateStr)
        .toLocaleDateString('es-ES', options)
        .replace('.', '');
};

const HackathonDetails = ({
    hackathon,
    participants,
    isRegistered,
    isDeveloper,
    isOrganizer,
    handleDelete,
    handleScoreChange,
    handleSubmitScores,
    scores,
    authUser,
    hackathonId,
}) => {
    const navigate = useNavigate();
    const { VITE_API_UPLOADS } = import.meta.env;

    return (
        <div className="relative z-10 bg-blanco bg-opacity-90 p-8 max-w-full mx-auto rounded-lg shadow-lg">
            <div className="grid grid-cols-1 lg:grid-cols-[65%_35%] lg:gap-8 max-w-3xl mx-auto">
                <div className="flex flex-col space-y-6 lg:mx-4">
                    <div className="bg-casiblanco p-4 rounded-lg shadow-md">
                        {/* Logo y nombre de hackathon */}
                        <div className="flex items-center justify-start space-x-4">
                            <img
                                className="w-24 border-4 rounded-sm border-verdemarino border-opacity-25"
                                src={`${VITE_API_UPLOADS}/${hackathon?.logo}`}
                                alt="Logo del hackathon."
                            />
                            <h1 className="text-header-big mt-0">
                                {hackathon?.name}
                            </h1>
                        </div>

                        {isOrganizer() &&
                            authUser?.id === hackathon?.organizerId && (
                                <div className="mt-4 flex space-x-4 justify-center">
                                    <button
                                        onClick={() =>
                                            navigate(
                                                `/hackathons/update/${hackathonId}`,
                                            )
                                        }
                                        className="button-angled-green"
                                    >
                                        Actualizar Hackathon
                                    </button>
                                    <button
                                        onClick={handleDelete}
                                        className="button-angled-red"
                                    >
                                        Eliminar Hackathon
                                    </button>
                                </div>
                            )}
                        {isDeveloper() && (
                            <div className="flex mt-4 justify-center">
                                {isRegistered ? (
                                    <button
                                        onClick={() =>
                                            navigate(
                                                `/hackathons/${hackathonId}/cancel`,
                                            )
                                        }
                                        className="button-angled-red"
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
                                        className="button-angled-green"
                                    >
                                        ¡Quiero inscribirme!
                                    </button>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Si el usuario es el organizador del hackathon, muestra lista de participantes */}
                    {isOrganizer() &&
                        authUser?.id === hackathon?.organizerId && (
                            <div className="bg-casiblanco p-4 rounded-lg shadow-md">
                                <h2 className="text-xl font-semibold mb-4">
                                    Desarrolladores inscritos
                                </h2>
                                <ul>
                                    {participants.length > 0 ? (
                                        participants.map((dev) => (
                                            <li
                                                key={dev.id}
                                                className="flex items-center justify-between mb-2"
                                            >
                                                <div className="flex items-center space-x-4">
                                                    <img
                                                        src={`${VITE_API_UPLOADS}/${dev.avatar}`}
                                                        alt={`${dev.username} avatar`}
                                                        className="w-10 h-10 rounded-full"
                                                    />
                                                    <p>{dev.username}</p>
                                                </div>
                                                <input
                                                    type="number"
                                                    placeholder="Puntuación"
                                                    value={
                                                        scores[dev.userId] || ''
                                                    }
                                                    onChange={(e) =>
                                                        handleScoreChange(
                                                            dev.userId,
                                                            e.target.value,
                                                        )
                                                    }
                                                    className="border p-1 rounded w-28"
                                                />
                                            </li>
                                        ))
                                    ) : (
                                        <p>No hay desarrolladores inscritos.</p>
                                    )}
                                </ul>

                                <div className="flex justify-end mt-4">
                                    <button
                                        onClick={handleSubmitScores}
                                        className="button-angled-green"
                                    >
                                        Guardar puntuaciones
                                    </button>
                                </div>
                            </div>
                        )}
                </div>

                <aside className="bg-casiblanco p-4 w-fit rounded-lg shadow-md lg:mt-0 lg:self-start lg:mr-4 mt-4 lg:gap-0 lg:mx-4">
                    <p>
                        <strong>Ubicación:</strong> {hackathon?.location}
                    </p>
                    <p>
                        <strong>Premios:</strong> {hackathon?.prizes}
                    </p>
                    <p>
                        <strong>Fechas del hackathon:</strong>{' '}
                        {formatDate(hackathon?.hackathonDate)} -{' '}
                        {formatDate(hackathon?.hackathonEnd)}
                    </p>
                    <p>
                        <strong>Inscripción:</strong>{' '}
                        {formatDate(hackathon?.inscriptionDate)} -{' '}
                        {formatDate(hackathon?.inscriptionEnd)}
                    </p>
                </aside>
            </div>
        </div>
    );
};

HackathonDetails.propTypes = {
    hackathon: PropTypes.shape({
        name: PropTypes.string,
        logo: PropTypes.string,
        inscriptionDate: PropTypes.string,
        inscriptionEnd: PropTypes.string,
        hackathonDate: PropTypes.string,
        hackathonEnd: PropTypes.string,
        location: PropTypes.string,
        prizes: PropTypes.string,
        documentation: PropTypes.string,
        organizerId: PropTypes.number,
    }),
    participants: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            avatar: PropTypes.string,
            username: PropTypes.string,
            userId: PropTypes.number.isRequired,
        }),
    ).isRequired,
    isRegistered: PropTypes.bool.isRequired,
    isDeveloper: PropTypes.func.isRequired,
    isOrganizer: PropTypes.func.isRequired,
    handleDelete: PropTypes.func.isRequired,
    handleScoreChange: PropTypes.func.isRequired,
    handleSubmitScores: PropTypes.func.isRequired,
    scores: PropTypes.objectOf(
        PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    ).isRequired,
    authUser: PropTypes.shape({
        id: PropTypes.number,
    }),
    hackathonId: PropTypes.string.isRequired,
};

export default HackathonDetails;
