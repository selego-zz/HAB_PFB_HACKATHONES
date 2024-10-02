import Joi from '@hapi/joi';
import joiErrorMessages from '../joiErrorMessages.js';

//////////////////////////////////////////////////////////////
// Esquema para loguearse, solo mail y contraseña
/////////////////////////////////////////////////////////////

const loginUserSchema = Joi.object().keys({
    email: Joi.string().email().max(100).required().messages(joiErrorMessages),
    password: Joi.string().max(100).required().messages(joiErrorMessages),
});

export default loginUserSchema;
