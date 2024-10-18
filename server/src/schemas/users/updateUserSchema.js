import Joi from '@hapi/joi';
import joiErrorMessages from '../joiErrorMessages.js';

//////////////////////////////////////////////////////////////
// Esquema de usuario que se ajusta a la base de datos
// todos los datos son opcionales, por que no tiene por qué
//       cambiar todos los campos
/////////////////////////////////////////////////////////////

const updateUserSchema = Joi.object().keys({
    username: Joi.string().max(50).optional().messages(joiErrorMessages),
    email: Joi.string().email().max(100).optional().messages(joiErrorMessages),
    firstName: Joi.string().max(50).optional().messages(joiErrorMessages),
    lastName: Joi.string().max(50).optional().messages(joiErrorMessages),
    role: Joi.string()
        .valid('administrador', 'organizador', 'desarrollador')
        .optional()
        .messages(joiErrorMessages),
    biography: Joi.string().max(900).optional().messages(joiErrorMessages),
    linkedIn: Joi.string().max(50).optional().messages(joiErrorMessages),
});

export default updateUserSchema;
