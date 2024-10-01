import Joi from '@hapi/joi';
import joiErrorMessages from '../joiErrorMessages.js';

///////////////////////////////////////////////////////////////
// Esquema de hackaton que se ajusta a la base de datos
// Tiene todos los campos no automáticos de la tabla hackathon
//////////////////////////////////////////////////////////////

const updateHackathonSchema = Joi.object().keys({
    //los mensajes de date.greater las pongo aquí por que dependen de la variable
    name: Joi.string().max(100).optional().messages(joiErrorMessages),
    inscriptionDate: Joi.date().optional().messages(joiErrorMessages),
    inscriptionEnd: Joi.date()
        .greater(Joi.ref('inscriptionDate'))
        .optional()
        .messages({
            ...joiErrorMessages,
            'date.greater':
                'La fecha de finalización de inscripción debe ser posterior a la fecha de inicio de inscripción',
        }),
    //permito que se inscriba gente aunque haya empezado el hackathon
    hackathonDate: Joi.date().optional().messages(joiErrorMessages),
    hackathonEnd: Joi.date()
        .greater(Joi.ref('hackathonDate'))
        .optional()
        .messages({
            ...joiErrorMessages,
            'date.greater':
                'La fecha de finalización debe ser posterior a la fecha de inicio',
        }),

    maxParticipants: Joi.number().optional().messages(joiErrorMessages),
    online: Joi.string()
        .valid('presencial', 'remoto')
        .optional()
        .messages(joiErrorMessages),
    location: Joi.string().max(200).optional().messages(joiErrorMessages),
    prizes: Joi.number().optional().messages(joiErrorMessages),
    logo: Joi.string().max(100).optional().messages(joiErrorMessages),
    documentation: Joi.string().max(100).optional().messages(joiErrorMessages),
});

export default updateHackathonSchema;
