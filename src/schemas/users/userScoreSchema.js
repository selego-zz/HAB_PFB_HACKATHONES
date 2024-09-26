import Joi from '@hapi/joi';
import joiErrorMessages from '../joiErrorMessages.js';

//////////////////////////////////////////////////////////////
// Esquema de puntuación de usuario
/////////////////////////////////////////////////////////////
const userScoreSchema = Joi.object().keys({
    userId: Joi.number().required().messages(joiErrorMessages),
    hackathonId: Joi.number().required().messages(joiErrorMessages),
    score: Joi.number().required().messages(joiErrorMessages),
});

export default userScoreSchema;
