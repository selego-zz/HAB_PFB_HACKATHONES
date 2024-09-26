import Joi from '@hapi/joi';
import joiErrorMessages from '../joiErrorMessages.js';
import { themesSchema, technologiesSchema } from './index.js';

///////////////////////////////////////////////////////////////
// Esquema de hackaton que se ajusta a la base de datos
// Tiene todos los campos no automáticos de la tabla hackathon
//////////////////////////////////////////////////////////////

const hackathonFilterSchema = Joi.object().keys({
    organizerId: Joi.number().optional(),
    inscriptionDate: Joi.date().optional().messages(joiErrorMessages),
    inscriptionEnd: Joi.date().optional().messages(joiErrorMessages),
    hackathonDate: Joi.date().optional().messages(joiErrorMessages),
    hackathonEnd: Joi.date().optional().messages(joiErrorMessages),
    maxParticipants: Joi.number().optional().messages(joiErrorMessages),
    online: Joi.boolean().optional().messages(joiErrorMessages),
    location: Joi.string().max(200).optional().messages(joiErrorMessages),
    prizes: Joi.number().optional().messages(joiErrorMessages),
    themes: Joi.array().items(themesSchema).optional(),
    technologies: Joi.array().items(technologiesSchema).optional(),
    orderBy: Joi.array()
        .items(
            Joi.string().valid(
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
