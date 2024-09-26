import Joi from '@hapi/joi';
import joiErrorMessages from './joiErrorMessages.js';

const loginUserSchema = Joi.object().keys({
    email: Joi.string().email().max(100).optional().messages(joiErrorMessages),
    password: Joi.string().max(100).optional().messages(joiErrorMessages),
});

export default loginUserSchema;
