import { toast } from 'react-hot-toast';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useTechnologies, useThemes } from '../hooks';

const CreateHackathonForm = ({
    formData,
    handleChange,
    handleTechnologyChange,
    handleThemeChange,
    handleSubmit,
    buttonMessage,
    forceDate,
}) => {
    const [currentDate, setCurrentDate] = useState('');
    const [inscriptionDate, setInscriptionDate] = useState('');
    const [inscriptionEnd, setInscriptionEnd] = useState('');
    const [hackathonDate, setHackathonDate] = useState('');
    const [hackathonEnd, setHackathonEnd] = useState('');

    const { technologies } = useTechnologies(); // Todas las tecnologías (para el map)
    const { themes } = useThemes(); // Todas las tecnologías (para el map)

    useEffect(() => {
        // Validación de datos
        try {
            if (currentDate.length < 1) setCurrentDate(new Date());
            if (!inscriptionDate.length < 1)
                setInscriptionDate(new Date(formData.inscriptionDate));
            if (!inscriptionEnd.length < 1)
                setInscriptionEnd(new Date(formData.inscriptionEnd));
            if (!hackathonDate.length < 1)
                setHackathonDate(new Date(formData.hackathonDate));
            if (!hackathonEnd.length < 1)
                setHackathonEnd(new Date(formData.hackathonEnd));

            if (!forceDate) {
                //puede ser que estemos modificando un hackathon en marcha o antiguo, con lo que las fechas podrían ser anteriores
                // Verificar fechas
                if (inscriptionDate && inscriptionDate < currentDate) {
                    throw new Error(
                        'La fecha de inscripción no puede ser una fecha pasada.',
                        {
                            id: 'createhackathonform',
                        },
                    );
                }
                if (inscriptionEnd && inscriptionEnd < inscriptionDate) {
                    throw new Error(
                        'La fecha de fin de inscripción no puede ser anterior a la fecha de inicio.',
                        {
                            id: 'createhackathonform',
                        },
                    );
                }
                if (hackathonDate && hackathonDate < inscriptionEnd) {
                    throw new Error(
                        'La fecha del hackathon no puede ser anterior a la fecha de fin de inscripción.',
                        {
                            id: 'createhackathonform',
                        },
                    );
                }
                if (hackathonEnd && hackathonEnd < hackathonDate) {
                    throw new Error(
                        'La fecha de finalización del hackathon no puede ser anterior a la fecha de inicio.',
                        {
                            id: 'createhackathonform',
                        },
                    );
                }
            }
            // Verificar que los premios y participantes no sean negativos
            if (formData.prizes && formData.prizes < 0) {
                throw new Error(
                    'El valor de los premios no puede ser negativo.',
                    {
                        id: 'createhackathonform',
                    },
                );
            }
            if (formData.maxParticipants && formData.maxParticipants < 1) {
                throw new Error(
                    'El número máximo de participantes debe ser mayor a 0.',
                    {
                        id: 'createhackathonform',
                    },
                );
            }
        } catch (err) {
            toast.error(err.message, {
                id: 'createhackathonform',
            });
        }
    }, [
        currentDate,
        forceDate,
        hackathonDate,
        hackathonEnd,
        inscriptionDate,
        inscriptionEnd,
        formData.hackathonDate,
        formData.hackathonEnd,
        formData.inscriptionDate,
        formData.inscriptionEnd,
        formData.maxParticipants,
        formData.prizes,
        formData.requirements,
        formData.description,
        formData.technologies,
        formData.themes,
    ]);

    return (
        <div className="max-w-4xl mx-auto py-8 px-4">
            <h2 className="text-center text-3xl font-jost font-semibold text-azuloscuro m-10 mb-16">
                CREAR EVENTO DE HACKATHON
            </h2>
            {/* FORMULARIO */}
            <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-8 md:grid md:grid-cols-2"
            >
                <div className="min-w-[200px]">
                    <label className="label">Nombre del Hackathon:</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="input"
                        required
                    />
                </div>

                <div className="min-w-[200px]">
                    <label className="label">Premio (€):</label>
                    <input
                        type="number"
                        name="prizes"
                        value={formData.prizes}
                        onChange={handleChange}
                        className="input number-input-hide"
                    />
                </div>

                <div className="min-w-[200px]">
                    <label className="label">Fecha de inscripción:</label>
                    <input
                        type="datetime-local"
                        name="inscriptionDate"
                        value={formatDate(formData.inscriptionDate)}
                        onChange={handleChange}
                        className="input date-input-icon-padding"
                        required
                    />
                </div>

                <div className="min-w-[200px]">
                    <label className="label">
                        Fecha de fin de inscripción:
                    </label>
                    <input
                        type="datetime-local"
                        name="inscriptionEnd"
                        value={formatDate(formData.inscriptionEnd)}
                        onChange={handleChange}
                        className="input date-input-icon-padding"
                        required
                    />
                </div>

                <div className="min-w-[200px]">
                    <label className="label">Fecha del hackathon:</label>
                    <input
                        type="datetime-local"
                        name="hackathonDate"
                        value={formatDate(formData.hackathonDate)}
                        onChange={handleChange}
                        className="input date-input-icon-padding"
                        required
                    />
                </div>

                <div className="min-w-[200px]">
                    <label className="label">Finalización del hackathon:</label>
                    <input
                        type="datetime-local"
                        name="hackathonEnd"
                        value={formatDate(formData.hackathonEnd)}
                        onChange={handleChange}
                        className="input date-input-icon-padding"
                        required
                    />
                </div>

                <div className="min-w-[200px]">
                    <label className="label">
                        Número máximo de participantes:
                    </label>
                    <input
                        type="number"
                        name="maxParticipants"
                        value={formData.maxParticipants}
                        onChange={handleChange}
                        className="input number-input-hide"
                        required
                    />
                </div>

                <div className="min-w-[200px]">
                    <label className="label">Ubicación:</label>
                    <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        className="input"
                    />
                    <div className="flex gap-8 justify-center mt-3">
                        <label className="label">
                            <input
                                type="radio"
                                name="online"
                                value="presencial"
                                checked={formData.online === 'presencial'}
                                onChange={handleChange}
                                className="form-radio"
                            />
                            <span className="ml-2">Presencial</span>
                        </label>
                        <label className="label">
                            <input
                                type="radio"
                                name="online"
                                value="remoto"
                                checked={formData.online === 'remoto'}
                                onChange={handleChange}
                                className="form-radio"
                            />
                            <span className="ml-2">Remoto</span>
                        </label>
                    </div>
                </div>

                <div>
                    <label className="label">Logo del hackathon:</label>
                    <input
                        type="file"
                        name="logo"
                        id="logo"
                        className="hidden"
                        onChange={handleChange}
                        accept="image/*"
                    />
                    <label
                        htmlFor="logo"
                        className="cursor-pointer flex justify-center mt-1"
                    >
                        <div className="bg-verdemarino w-56 h-9 rounded-3xl font-jost font-semibold text-azuloscuro flex items-center justify-center hover:bg-verdeclaro">
                            <img
                                src="/assets/icons/folders_icon.png"
                                alt="Icono de carga"
                                className="w-6 h-6 mr-2"
                            />
                            <span>Seleccionar imagen</span>
                        </div>
                    </label>
                </div>

                <div className="min-w-[200px]">
                    <label className="label">Documentación:</label>
                    <input
                        type="file"
                        name="documentation"
                        id="documentacion"
                        onChange={handleChange}
                        className="hidden"
                        accept=".pdf,.doc,.docx"
                    />
                    <label
                        htmlFor="documentacion"
                        className="cursor-pointer flex justify-center mt-1"
                    >
                        <div className="bg-verdemarino w-56 h-9 rounded-3xl font-jost font-semibold text-azuloscuro flex items-center justify-center hover:bg-verdeclaro">
                            <img
                                src="/assets/icons/folders_icon.png"
                                alt="Icono de carga"
                                className="w-6 h-6 mr-2"
                            />
                            <span>Seleccionar archivo</span>
                        </div>
                    </label>
                </div>

                <div className="min-w-[200px] col-span-2">
                    <label className="font-jost font-semibold text-azuloscuro text-lg ml-8">
                        Descripción:
                    </label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        maxLength={500}
                        className="textarea"
                        rows={4}
                    />
                </div>

                <div className="min-w-[200px] col-span-2">
                    <label className="font-jost font-semibold text-azuloscuro text-lg ml-8">
                        Requisitos:
                    </label>
                    <textarea
                        name="requirements"
                        value={formData.requirements}
                        onChange={handleChange}
                        maxLength={500}
                        className="textarea"
                        rows={4}
                    />
                </div>

                {/* Selector de tecnologías */}
                <div className="min-w-[200px] col-span-2 mt-10">
                    <label className="label">Tecnologías:</label>

                    <div className=" flex flex-wrap gap-4 p-4 rounded-3xl bg-casiblanco mx-auto text-azuloscuro font-jost focus:ring-2">
                        {Array.isArray(technologies) &&
                            technologies.map((tech) => (
                                <label
                                    key={tech.technology}
                                    className="inline-flex items-center"
                                >
                                    <input
                                        type="checkbox"
                                        value={tech.technology}
                                        checked={formData?.technologies?.some(
                                            (t) =>
                                                t.technology ===
                                                tech.technology,
                                        )}
                                        onChange={handleTechnologyChange}
                                        className="form-checkbox h-4 w-4"
                                    />
                                    <span className="ml-1 text-azuloscuro font-jost font-medium">
                                        {tech.technology}
                                    </span>
                                </label>
                            ))}
                    </div>
                </div>

                {/* Selector de temáticas */}
                <div className="min-w-[200px] col-span-2 mt-10">
                    <label className="label">Temáticas:</label>

                    <div className=" flex flex-wrap gap-4 p-4 rounded-3xl bg-casiblanco mx-auto text-azuloscuro font-jost focus:ring-2">
                        {Array.isArray(themes) &&
                            themes.map((them) => (
                                <label
                                    key={them.theme}
                                    className="inline-flex items-center"
                                >
                                    <input
                                        type="checkbox"
                                        value={them.theme}
                                        checked={formData?.themes?.some(
                                            (t) => t.theme === them.theme,
                                        )}
                                        onChange={handleThemeChange}
                                        className="form-checkbox h-4 w-4"
                                    />
                                    <span className="ml-1 text-azuloscuro font-jost font-medium">
                                        {them.theme}
                                    </span>
                                </label>
                            ))}
                    </div>
                </div>

                {/* Botón de envío */}
                <div className="col-span-2 mt-12">
                    <button className="button-blue">{buttonMessage}</button>
                </div>
            </form>
        </div>
    );
};

//funcion auxiliar para formatear las fechas para los campos date
const formatDate = (date) => {
    if (!date) return '';
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const hours = String(d.getHours()).padStart(2, '0');
    const minutes = String(d.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}`;
};

// Añadimos las validaciones de las props usando prop-types
CreateHackathonForm.propTypes = {
    formData: PropTypes.shape({
        name: PropTypes.string.isRequired,
        inscriptionDate: PropTypes.string.isRequired,
        inscriptionEnd: PropTypes.string.isRequired,
        hackathonDate: PropTypes.string.isRequired,
        hackathonEnd: PropTypes.string.isRequired,
        prizes: PropTypes.string.isRequired,
        maxParticipants: PropTypes.string.isRequired,
        location: PropTypes.string,
        online: PropTypes.string.isRequired,
        logo: PropTypes.any,
        documentation: PropTypes.any,
        requirements: PropTypes.string,
        description: PropTypes.string,
        technologies: PropTypes.array,
        themes: PropTypes.array,
    }).isRequired,
    handleChange: PropTypes.func.isRequired,
    handleTechnologyChange: PropTypes.func.isRequired,
    handleThemeChange: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    buttonMessage: PropTypes.string.isRequired,
    forceDate: PropTypes.bool,
};

export default CreateHackathonForm;
