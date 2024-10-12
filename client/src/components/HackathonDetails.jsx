import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

//////

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
            <h1 className="text-header-big">{hackathon?.name}</h1>
            <img src={VITE_API_UPLOADS + '/' + hackathon?.logo} alt="Logo" />
            <p>
                <strong>Fecha de inscripción:</strong>{' '}
                {hackathon?.inscriptionDate} - {hackathon?.inscriptionEnd}
            </p>
            <p>
                <strong>Fecha del hackathon:</strong> {hackathon?.hackathonDate}{' '}
                - {hackathon?.hackathonEnd}
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

            {/* Botones de inscripción/cancelación de inscripción para desarrolladores */}
            {isDeveloper() && (
                <div className="mt-4">
                    {isRegistered ? (
                        <button
                            onClick={() =>
                                navigate(`/hackathons/${hackathonId}/cancel`)
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

            {/* Opciones del organizador */}
            {isOrganizer() && authUser?.id === hackathon?.organizerId && (
                <div className="mt-4">
                    <button
                        onClick={() =>
                            navigate(`/hackathons/update/${hackathonId}`)
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

            {/* Lista de desarrolladores inscritos */}
            {isOrganizer() && authUser?.id === hackathon?.organizerId && (
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
                                            src={
                                                VITE_API_UPLOADS +
                                                '/' +
                                                dev.avatar
                                            }
                                            alt={`${dev.username} avatar`}
                                            className="w-10 h-10 rounded-full mr-2"
                                        />
                                        <p>{dev.username}</p>
                                    </div>
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
                                </li>
                            ))
                        ) : (
                            <p>No hay desarrolladores inscritos.</p>
                        )}
                    </ul>
                </div>
            )}

            {/* Botón para enviar puntuaciones */}
            {isOrganizer() && authUser?.id === hackathon?.organizerId && (
                <button
                    onClick={handleSubmitScores}
                    className="button-angled-green"
                >
                    Guardar puntuaciones
                </button>
            )}
        </div>
    );
};

export default HackathonDetails;

// Validamos las props
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
