import Joi from '@hapi/joi';
import joiErrorMessages from '../joiErrorMessages.js';

//////////////////////////////////////////////////////////////
// Esquema de inscipción en un hackaton
// Tiene los campos userId, hackathonId e inscriptionDate
// el resto de datos no se saben hasta que acabe el hackathon
/////////////////////////////////////////////////////////////

const enrollsInSchema = Joi.object().keys({
    hackathonId: Joi.number().required().messages(joiErrorMessages),
    userId: Joi.number().required().messages(joiErrorMessages),
    date: Joi.date().required().messages(joiErrorMessages),
});

export default enrollsInSchema;
