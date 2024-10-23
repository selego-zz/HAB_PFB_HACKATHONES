import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext.jsx';

import PropTypes from 'prop-types';
import toast from 'react-hot-toast';

import dayjs from 'dayjs';
import Swal from 'sweetalert2';

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
    const { authToken } = useContext(AuthContext);
    const { VITE_API_URL, VITE_API_UPLOADS } = import.meta.env;

    // Formato de fechas
    const formattedInscrStartDate = dayjs(hackathon?.inscriptionDate).format(
        'DD/MM/YYYY HH:mm',
    );
    const formattedInscrEndDate = dayjs(hackathon?.inscriptionEnd).format(
        'DD/MM/YYYY HH:mm',
    );
    const formattedHackStartDate = dayjs(hackathon?.hackathonDate).format(
        'DD/MM/YYYY HH:mm',
    );
    const formattedHackEndDate = dayjs(hackathon?.hackathonEnd).format(
        'DD/MM/YYYY HH:mm',
    );

    // Función para inscribirse en el hackathon
    const handleInscription = async () => {
        try {
            const { value: confirmed } = await Swal.fire({
                title: '¿Quieres inscribirte?',
                text: 'Estás a punto de inscribirte en este hackathon.',
                icon: 'question',
                showCancelButton: true,
                confirmButtonText: 'Sí, inscribirme',
                cancelButtonText: 'Cancelar',
            });

            if (confirmed) {
                const res = await fetch(
                    `${VITE_API_URL}/hackathons/${hackathonId}`,
                    {
                        method: 'POST',
                        headers: {
                            Authorization: authToken,
                        },
                    },
                );

                const hackathon = await res.json();

                const now = new Date();
                const registrationEnd = new Date(hackathon.inscriptionEnd);

                if (now > registrationEnd) {
                    setIsRegistrationOpen(false);
                    throw new Error(
                        'La fecha de inscripción para este hackathon ya ha pasado',
                    );
                }

                toast.success('Inscripción realizada con éxito.');
                navigate(`/hackathons/${hackathonId}`);
            }
        } catch (err) {
            toast.error(err.message);
        }
    };

    // Función para cancelar la inscripción
    const handleCancelInscription = async () => {
        try {
            const { value: confirmed } = await Swal.fire({
                title: '¿Quieres cancelar tu inscripción?',
                text: 'Podrás volver a inscribirte siempre y cuando estés dentro del plazo de inscripción.',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Sí, cancelar',
                cancelButtonText: 'Volver',
            });

            if (confirmed) {
                const res = await fetch(
                    `${VITE_API_URL}/hackathons/${hackathonId}/cancel`,
                    {
                        method: 'DELETE',
                        headers: {
                            Authorization: authToken,
                        },
                    },
                );

                const result = await res.json();
                if (result.status === 'error') {
                    throw new Error(result.message);
                }

                toast.success('Inscripción cancelada.');
                navigate(`/hackathons/${hackathonId}`);
            }
        } catch (err) {
            toast.error(`Error: ${err.message}`);
        }
    };

    return (
        <div className="relative z-10 bg-blanco bg-opacity-90 p-8 max-w-full mx-auto rounded-lg shadow-lg font-jost">
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
                        <p className="text-lg mt-2">
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
                                        onClick={handleCancelInscription}
                                        className="button-angled-red"
                                    >
                                        Cancelar mi inscripción
                                    </button>
                                ) : (
                                    <button
                                        onClick={handleInscription}
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
                        <p>
                            {hackathon?.requirements ||
                                'No hay requisitos especificados.'}
                        </p>
                    </div>

                    {/* Lista de participantes si es organizador */}
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

                {/* Detalles del hackathon */}
                <aside className="flex flex-col gap-7 bg-casiblanco p-4 w-full rounded-lg shadow-md lg:mt-0 lg:self-start lg:mr-4 mt-6 lg:mx-4">
                    <h2 className="text-xl font-semibold">
                        Detalles del Hackathon
                    </h2>

                    <p className="flex items-center">
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
                            <span className="font-semibold">
                                {hackathon?.location}
                            </span>
                        )}
                    </p>

                    <p className="flex items-center">
                        <img
                            src="/assets/icons/prizes.svg"
                            alt="Icono de premios de hackathon."
                            width="30"
                            className="mr-2"
                        />
                        <strong className="font-medium bg-amarillo w-fit rounded-lg px-2">
                            {hackathon?.prizes}€
                        </strong>
                        &nbsp;en premios.
                    </p>

                    <div className="flex items-center">
                        <img
                            src="/assets/icons/calendar.svg"
                            alt="Icono de fecha de hackathon."
                            width="30"
                            className="mr-2"
                        />
                        <p>
                            Del
                            <strong className="whitespace-nowrap font-semibold bg-azuloscuro text-blanco rounded-md px-1 inline-block m-1">
                                {formattedHackStartDate}
                            </strong>
                            <br />
                            al
                            <strong className="whitespace-normal font-semibold bg-azuloscuro text-blanco rounded-md px-1 inline-block m-1">
                                {formattedHackEndDate}
                            </strong>
                            .
                        </p>
                    </div>

                    <div className="flex items-center">
                        <img
                            src="/assets/icons/inscription.svg"
                            alt="Icono de inscripción de hackathon."
                            width="30"
                            className="mr-2"
                        />
                        <p>
                            Inscripciones abiertas <br />
                            del
                            <strong className="whitespace-nowrap font-semibold bg-verdeagua text-blanco rounded-md px-1 inline-block m-1">
                                {formattedInscrStartDate}
                            </strong>
                            <br />
                            al
                            <strong className="whitespace-nowrap font-semibold bg-verdeagua text-blanco rounded-md px-1 inline-block m-1">
                                {formattedInscrEndDate}
                            </strong>
                            .
                        </p>
                    </div>

                    <p className="flex items-center">
                        <img
                            src="/assets/icons/flag-techs.png"
                            alt="Icono de tecnologías de hackathon."
                            width="30"
                            className="mr-2"
                        />
                        <span className="font-semibold">
                            {hackathon?.technologies?.length > 0 ? (
                                hackathon.technologies.map((tech, index) => (
                                    <span
                                        key={index}
                                        className="inline-block bg-verdemarino rounded-full px-4 py-1 m-1"
                                    >
                                        {tech.technology}
                                    </span>
                                ))
                            ) : (
                                <span>No hay tecnologías disponibles.</span>
                            )}
                        </span>
                    </p>

                    <p className="flex items-center">
                        <img
                            src="/assets/icons/tag-themes.png"
                            alt="Icono de temáticas de hackathon."
                            width="30"
                            className="mr-2"
                        />
                        <span className="font-semibold">
                            {hackathon?.themes?.length > 0 ? (
                                hackathon.themes.map((theme, index) => (
                                    <span
                                        key={index}
                                        className="
                                        inline-block bg-blanco bg-opacity-95 rounded-full px-4 py-1 m-1"
                                    >
                                        {theme.theme}
                                    </span>
                                ))
                            ) : (
                                <span>No hay temáticas disponibles.</span>
                            )}
                        </span>
                    </p>
                </aside>
            </div>
        </div>
    );
};

// Validar props
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
        themes: PropTypes.arrayOf(
            PropTypes.shape({
                theme: PropTypes.string.isRequired,
            }),
        ),
        technologies: PropTypes.arrayOf(
            PropTypes.shape({
                technology: PropTypes.string.isRequired,
            }),
        ),
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
