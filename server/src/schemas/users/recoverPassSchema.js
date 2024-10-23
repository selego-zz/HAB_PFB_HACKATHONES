import Joi from '@hapi/joi';
import joiErrorMessages from '../joiErrorMessages.js';

//////////////////////////////////////////////////////////////
// Esquema de cambio de contraseña
// Tiene la contraseña vieja, la nueva, y la repetición de la nueva
/////////////////////////////////////////////////////////////
const recoverPassSchema = Joi.object().keys({
    password: Joi.string()
        .min(6)
        .max(100)
        .required()
        .messages(joiErrorMessages),
});

export default recoverPassSchema;
