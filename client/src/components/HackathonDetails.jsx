import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const formatDate = (dateStr) => {
    const options = { day: 'numeric', month: 'short', year: '2-digit' };
    return new Date(dateStr)
        .toLocaleDateString('es-ES', options)
        .replace('.', '');
};

// Renderizado de detalles de hackathon
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
                    {/* Logo, nombre y descripción de hackathon */}
                    <div className="bg-casiblanco p-4 rounded-lg shadow-md">
                        <div className="flex items-center justify-start space-x-4">
                            {hackathon?.logo && (
                                <img
                                    className="w-24 border-4 rounded-sm border-verdemarino border-opacity-25"
                                    src={`${VITE_API_UPLOADS}/${hackathon?.logo}`}
                                    alt="Logo del hackathon."
                                />
                            )}

                            <h1 className="text-header-big mt-0">
                                {hackathon?.name}
                            </h1>
                        </div>
                        <p className="text-xl mt-2">
                            {hackathon?.description ||
                                'No hay descripción disponible.'}
                        </p>

                        {isOrganizer() &&
                            authUser?.id === hackathon?.organizerId && (
                                <div className="mt-4 flex space-x-4 justify-center">
                                    <button
                                        onClick={() =>
                                            navigate(
                                                `/hackathons/${hackathonId}/update`,
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

                    {/* Requisitos del hackathon */}
                    <div className="bg-casiblanco p-4 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold mb-2">
                            Requisitos
                        </h2>
                        <p className="text-sm">
                            {hackathon?.requirements ||
                                'No hay requisitos especificados.'}
                        </p>
                    </div>

                    {/* Si el usuario es el organizador del hackathon, muestra lista de participantes */}
                    {isOrganizer() &&
                        authUser?.id === hackathon?.organizerId && (
                            <div className="bg-casiblanco p-4 rounded-lg shadow-md">
                                <h2 className="text-xl font-semibold mb-4">
                                    Desarrolladores inscritos
                                </h2>
                                <ul>
                                    {participants?.developers?.length > 0 ? (
                                        participants.developers.map((dev) => (
                                            <li
                                                key={dev.userId}
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
                                                    placeholder={
                                                        dev.score ||
                                                        'Puntuación'
                                                    }
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

                                {participants?.developers?.length > 0 && (
                                    <div className="flex justify-end mt-4">
                                        <button
                                            onClick={handleSubmitScores}
                                            className="button-angled-green"
                                        >
                                            Guardar puntuaciones
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}
                </div>

                <aside className="bg-casiblanco p-4 w-full rounded-lg shadow-md lg:mt-0 lg:self-start lg:mr-4 mt-4 lg:gap-0 lg:mx-4">
                    <h2 className="text-xl font-semibold mb-4">
                        Detalles del Hackathon
                    </h2>

                    <div className="mb-4">
                        <p className="flex items-center mb-2">
                            <img
                                src="/assets/icons/location.svg"
                                alt="Icono de ubicación de hackathon."
                                width="30"
                                className="mr-2"
                            />
                            {hackathon?.location.startsWith('http') ? (
                                <a
                                    href={hackathon?.location}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center px-2 py-1 border inset-24 border-verdeagua rounded-3xl hover:bg-azuloscuro hover:text-blanco transition"
                                >
                                    Online →
                                </a>
                            ) : (
                                hackathon?.location
                            )}
                        </p>

                        <p className="flex items-center mb-2 font-medium">
                            <img
                                src="/assets/icons/prizes.svg"
                                alt="Icono de ubicación de hackathon."
                                width="30"
                                className="mr-2"
                            />
                            <strong>{hackathon?.prizes}€</strong>&nbsp;en
                            premios.
                        </p>
                    </div>

                    <p className="flex items-center mb-2">
                        <img
                            src="/assets/icons/calendar.svg"
                            alt="Icono de fecha de hackathon."
                            width="30"
                            className="mr-2"
                        />
                        {`${formatDate(hackathon?.hackathonDate)} — ${formatDate(hackathon?.hackathonEnd)}`}
                    </p>

                    <div className="flex items-center mb-2">
                        <img
                            src="/assets/icons/inscription.svg"
                            alt="Icono de ubicación de hackathon."
                            width="30"
                            className="mr-2"
                        />
                        <p>
                            Inscripciones abiertas desde el&nbsp;
                            <strong>
                                {formatDate(hackathon?.inscriptionDate)}
                            </strong>
                            &nbsp;al&nbsp;
                            <strong>
                                {formatDate(hackathon?.inscriptionEnd)}
                            </strong>
                            .
                        </p>
                    </div>
                </aside>
            </div>
        </div>
    );
};

HackathonDetails.propTypes = {
    hackathon: PropTypes.shape({
        name: PropTypes.string,
        logo: PropTypes.string,
        description: PropTypes.string,
        requirements: PropTypes.string,
        inscriptionDate: PropTypes.string,
        inscriptionEnd: PropTypes.string,
        hackathonDate: PropTypes.string,
        hackathonEnd: PropTypes.string,
        location: PropTypes.string,
        prizes: PropTypes.string,
        documentation: PropTypes.string,
        organizerId: PropTypes.number,
    }),
    participants: PropTypes.shape({
        developers: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.number,
                avatar: PropTypes.string,
                username: PropTypes.string,
                userId: PropTypes.number,
            }),
        ),
    }),
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
