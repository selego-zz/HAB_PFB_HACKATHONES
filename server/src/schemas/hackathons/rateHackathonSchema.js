import Joi from '@hapi/joi';
import joiErrorMessages from '../joiErrorMessages.js';

//////////////////////////////////////////////////////////////
// Esquema de inscipción en un hackaton
// Tiene los campos userId, hackathonId e inscriptionDate
// el resto de datos no se saben hasta que acabe el hackathon
/////////////////////////////////////////////////////////////

const rateHackathonSchema = Joi.object().keys({
    rating: Joi.number().min(1).max(5).required().messages(joiErrorMessages),
});

export default rateHackathonSchema;
