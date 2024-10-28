import Joi from '@hapi/joi';
import joiErrorMessages from '../joiErrorMessages.js';

//////////////////////////////////////////////////////////////
// Esquema de usuario que se ajusta a la base de datos
// Tiene todos los campos no automáticos de la tabla usuarios
/////////////////////////////////////////////////////////////

const userSchema = Joi.object().keys({
    username: Joi.string().max(50).required().messages(joiErrorMessages),
    email: Joi.string().email().max(100).required().messages(joiErrorMessages),
    password: Joi.string()
        .min(6)
        .max(100)
        .required()
        .messages(joiErrorMessages),
    firstName: Joi.string().max(50).required().messages(joiErrorMessages),
    lastName: Joi.string().max(50).required().messages(joiErrorMessages),
    role: Joi.string()
        .valid('administrador', 'organizador', 'desarrollador')
        .required()
        .messages(joiErrorMessages),
    biography: Joi.string().max(900).optional().messages(joiErrorMessages),
    linkedIn: Joi.string().max(50).optional().messages(joiErrorMessages),
});

export default userSchema;
