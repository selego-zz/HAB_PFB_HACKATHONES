import Joi from '@hapi/joi';
import joiErrorMessages from '../joiErrorMessages.js';

///////////////////////////////////////////////////////////////
// Esquema de hackaton que se ajusta a la base de datos
// Tiene todos los campos no automáticos de la tabla hackathon
//////////////////////////////////////////////////////////////

const hackathonFilterSchema = Joi.object().keys({
    name: Joi.string().max(100).optional().messages(joiErrorMessages),
    organizerId: Joi.number().optional(),
    inscriptionDate: Joi.date().optional().messages(joiErrorMessages),
    inscriptionEnd: Joi.date().optional().messages(joiErrorMessages),
    hackathonDate: Joi.date().optional().messages(joiErrorMessages),
    hackathonEnd: Joi.date().optional().messages(joiErrorMessages),
    maxParticipants: Joi.number().optional().messages(joiErrorMessages),
    online: Joi.string().valid('presencial', 'remoto').optional().messages({
        'any.only': 'Campo "online" inválido, es "remoto" o "presencial".',
    }),
    location: Joi.string().max(200).optional().messages(joiErrorMessages),
    prizes: Joi.number().optional().messages(joiErrorMessages),
    themes: Joi.array().optional(),
    technologies: Joi.array().optional(),
    orderBy: Joi.array()
        .items(
            Joi.string().valid(
                'name',
                'organizerId',
                'inscriptionDate',
                'inscriptionEnd',
                'hackathonDate',
                'hackathonEnd',
                'maxParticipants',
                'online',
                'location',
                'prizes',
                'themes',
                'technologies',
            ),
        )
        .optional(),
});

export default hackathonFilterSchema;
