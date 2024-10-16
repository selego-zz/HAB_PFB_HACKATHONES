import { toast } from 'react-hot-toast';
import PropTypes from 'prop-types';

//////

const CreateHackathonForm = ({
    formData,
    handleChange,
    handleSubmit,
    buttonMessage,
    forceDate,
}) => {
    // Validación de datos
    try {
        const currentDate = new Date();
        const inscriptionDate = new Date(formData.inscriptionDate);
        const inscriptionEnd = new Date(formData.inscriptionEnd);
        const hackathonDate = new Date(formData.hackathonDate);
        const hackathonEnd = new Date(formData.hackathonEnd);

        console.log(formData.inscriptionDate);

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
            throw new Error('El valor de los premios no puede ser negativo.', {
                id: 'createhackathonform',
            });
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

    return (
        <div className="max-w-4xl mx-auto py-8 px-4">
            <h2 className="text-center text-2xl font-bold text-gray-700 mb-6">
                {buttonMessage}
            </h2>
            {/* FORMULARIO */}
            <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-4 sm:grid sm:grid-cols-2"
            >
                <div className="min-w-[200px]">
                    <label className="block text-sm font-medium text-gray-700 mx-2">
                        Nombre del Hackathon
                    </label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="mt-1 block w-11/12 mx-auto border-gray-300 rounded-md shadow-sm bg-verdeclaro p-2"
                        required
                    />
                </div>

                <div className="min-w-[200px]">
                    <label className="block text-sm font-medium text-gray-700 mx-2">
                        Premios
                    </label>
                    <input
                        type="number"
                        name="prizes"
                        value={formData.prizes}
                        onChange={handleChange}
                        className="mt-1 block w-11/12 mx-auto border-gray-300 rounded-md shadow-sm bg-verdeclaro p-2"
                    />
                </div>

                <div className="min-w-[200px]">
                    <label className="block text-sm font-medium text-gray-700 mx-2">
                        Fecha de inscripción
                    </label>
                    <input
                        type="datetime-local"
                        name="inscriptionDate"
                        value={formData.inscriptionDate}
                        onChange={handleChange}
                        className="mt-1 block w-11/12 mx-auto border-gray-300 rounded-md shadow-sm bg-verdeclaro p-2"
                        required
                    />
                </div>

                <div className="min-w-[200px]">
                    <label className="block text-sm font-medium text-gray-700 mx-2">
                        Fecha de fin de inscripción
                    </label>
                    <input
                        type="datetime-local"
                        name="inscriptionEnd"
                        value={formData.inscriptionEnd}
                        onChange={handleChange}
                        className="mt-1 block w-11/12 mx-auto border-gray-300 rounded-md shadow-sm bg-verdeclaro p-2"
                        required
                    />
                </div>

                <div className="min-w-[200px]">
                    <label className="block text-sm font-medium text-gray-700 mx-2">
                        Fecha del hackathon
                    </label>
                    <input
                        type="datetime-local"
                        name="hackathonDate"
                        value={formData.hackathonDate}
                        onChange={handleChange}
                        className="mt-1 block w-11/12 mx-auto border-gray-300 rounded-md shadow-sm bg-verdeclaro p-2"
                        required
                    />
                </div>

                <div className="min-w-[200px]">
                    <label className="block text-sm font-medium text-gray-700 mx-2">
                        Finalización del hackathon
                    </label>
                    <input
                        type="datetime-local"
                        name="hackathonEnd"
                        value={formData.hackathonEnd}
                        onChange={handleChange}
                        className="mt-1 block w-11/12 mx-auto border-gray-300 rounded-md shadow-sm bg-verdeclaro p-2"
                        required
                    />
                </div>

                <div className="min-w-[200px]">
                    <label className="block text-sm font-medium text-gray-700 mx-2">
                        Número máximo de participantes
                    </label>
                    <input
                        type="number"
                        name="maxParticipants"
                        value={formData.maxParticipants}
                        onChange={handleChange}
                        className="mt-1 block w-11/12 mx-auto border-gray-300 rounded-md shadow-sm bg-verdeclaro p-2"
                        required
                    />
                </div>

                <div className="min-w-[200px]">
                    <label className="block text-sm font-medium text-gray-700 mx-2">
                        Ubicación
                    </label>
                    <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        className="mt-1 block w-11/12 mx-auto border-gray-300 rounded-md shadow-sm bg-verdeclaro p-2"
                    />
                    <div className="flex mt-2">
                        <label className="inline-flex items-center mx-2">
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
                        <label className="inline-flex items-center mx-2">
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

                <div className="min-w-[200px]">
                    <label className="block text-sm font-medium text-gray-700 mx-2">
                        Logo del hackathon
                    </label>
                    <input
                        type="file"
                        name="logo"
                        onChange={handleChange}
                        className="mt-1 block w-11/12 mx-auto border-gray-300 rounded-md shadow-sm bg-verdeclaro p-2"
                        accept="image/*"
                    />
                </div>

                <div className="min-w-[200px]">
                    <label className="block text-sm font-medium text-gray-700 mx-2">
                        Documentación
                    </label>
                    <input
                        type="file"
                        name="documentation"
                        onChange={handleChange}
                        className="mt-1 block w-11/12 mx-auto border-gray-300 rounded-md shadow-sm bg-verdeclaro p-2"
                        accept=".pdf,.doc,.docx"
                    />
                </div>

                {/* Botón de envío */}
                <div className="col-span-2">
                    <button className="mt-4 font-bold bg-verdeagua py-2 px-4 rounded-lg hover:bg-verdemarino w-1/3 mx-auto block">
                        {buttonMessage}
                    </button>
                </div>
            </form>
        </div>
    );
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
    }).isRequired,
    handleChange: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    buttonMessage: PropTypes.string.isRequired,
    forceDate: PropTypes.bool,
};

export default CreateHackathonForm;
