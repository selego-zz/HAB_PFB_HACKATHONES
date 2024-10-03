import Joi from '@hapi/joi';
import joiErrorMessages from '../joiErrorMessages.js';

//////////////////////////////////////////////////////////////
// Esquema de puntuación de usuario
/////////////////////////////////////////////////////////////
const userScoreSchema = Joi.object().keys({
    score: Joi.number().required().messages(joiErrorMessages),
});

export default userScoreSchema;
