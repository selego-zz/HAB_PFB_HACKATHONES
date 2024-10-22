import { toast } from 'react-hot-toast';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

const CreateHackathonForm = ({
    formData,
    handleChange,
    handleSubmit,
    buttonMessage,
    forceDate,
}) => {
    const [currentDate, setCurrentDate] = useState('');
    const [inscriptionDate, setInscriptionDate] = useState('');
    const [inscriptionEnd, setInscriptionEnd] = useState('');
    const [hackathonDate, setHackathonDate] = useState('');
    const [hackathonEnd, setHackathonEnd] = useState('');

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
    ]);
    return (
        <div className="max-w-4xl mx-auto py-8 px-4">
            <h2 className="text-center text-2xl font-bold mb-6">
                {buttonMessage}
            </h2>
            {/* FORMULARIO */}
            <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-4 sm:grid sm:grid-cols-2"
            >
                <div className="min-w-[200px]">
                    <label className="block text-sm font-medium mx-2">
                        Nombre del Hackathon
                    </label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="mt-1 block w-11/12 mx-auto rounded-md shadow-sm bg-verdeclaro p-2"
                        required
                    />
                </div>

                <div className="min-w-[200px]">
                    <label className="block text-sm font-medium mx-2">
                        Premios
                    </label>
                    <input
                        type="number"
                        name="prizes"
                        value={formData.prizes}
                        onChange={handleChange}
                        className="mt-1 block w-11/12 mx-auto rounded-md shadow-sm bg-verdeclaro p-2"
                    />
                </div>

                <div className="min-w-[200px]">
                    <label className="block text-sm font-medium mx-2">
                        Fecha de inscripción
                    </label>
                    <input
                        type="datetime-local"
                        name="inscriptionDate"
                        value={formatDate(formData.inscriptionDate)}
                        onChange={handleChange}
                        className="mt-1 block w-11/12 mx-auto rounded-md shadow-sm bg-verdeclaro p-2"
                        required
                    />
                </div>

                <div className="min-w-[200px]">
                    <label className="block text-sm font-medium mx-2">
                        Fecha de fin de inscripción
                    </label>
                    <input
                        type="datetime-local"
                        name="inscriptionEnd"
                        value={formatDate(formData.inscriptionEnd)}
                        onChange={handleChange}
                        className="mt-1 block w-11/12 mx-auto rounded-md shadow-sm bg-verdeclaro p-2"
                        required
                    />
                </div>

                <div className="min-w-[200px]">
                    <label className="block text-sm font-medium mx-2">
                        Fecha del hackathon
                    </label>
                    <input
                        type="datetime-local"
                        name="hackathonDate"
                        value={formatDate(formData.hackathonDate)}
                        onChange={handleChange}
                        className="mt-1 block w-11/12 mx-auto rounded-md shadow-sm bg-verdeclaro p-2"
                        required
                    />
                </div>

                <div className="min-w-[200px]">
                    <label className="block text-sm font-medium mx-2">
                        Finalización del hackathon
                    </label>
                    <input
                        type="datetime-local"
                        name="hackathonEnd"
                        value={formatDate(formData.hackathonEnd)}
                        onChange={handleChange}
                        className="mt-1 block w-11/12 mx-auto rounded-md shadow-sm bg-verdeclaro p-2"
                        required
                    />
                </div>

                <div className="min-w-[200px]">
                    <label className="block text-sm font-medium mx-2">
                        Número máximo de participantes
                    </label>
                    <input
                        type="number"
                        name="maxParticipants"
                        value={formData.maxParticipants}
                        onChange={handleChange}
                        className="mt-1 block w-11/12 mx-auto rounded-md shadow-sm bg-verdeclaro p-2"
                        required
                    />
                </div>

                <div className="min-w-[200px]">
                    <label className="block text-sm font-medium mx-2">
                        Ubicación
                    </label>
                    <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        className="mt-1 block w-11/12 mx-auto rounded-md shadow-sm bg-verdeclaro p-2"
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
                    <label className="block text-sm font-medium mx-2">
                        Logo del hackathon
                    </label>
                    <input
                        type="file"
                        name="logo"
                        onChange={handleChange}
                        className="mt-1 block w-11/12 mx-auto rounded-md shadow-sm bg-verdeclaro p-2"
                        accept="image/*"
                    />
                </div>

                <div className="min-w-[200px]">
                    <label className="block text-sm font-medium mx-2">
                        Documentación
                    </label>
                    <input
                        type="file"
                        name="documentation"
                        onChange={handleChange}
                        className="mt-1 block w-11/12 mx-auto rounded-md shadow-sm bg-verdeclaro p-2"
                        accept=".pdf,.doc,.docx"
                    />
                </div>

                <div className="min-w-[200px] col-span-2">
                    <label className="block text-sm font-medium mx-2">
                        Descripción
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
                    <label className="block text-sm font-medium mx-2">
                        Requisitos
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
    }).isRequired,
    handleChange: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    buttonMessage: PropTypes.string.isRequired,
    forceDate: PropTypes.bool,
};

export default CreateHackathonForm;
