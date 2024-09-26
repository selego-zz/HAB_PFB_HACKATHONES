import Joi from '@hapi/joi';
import joiErrorMessages from '../joiErrorMessages.js';

//////////////////////////////////////////////////////////////
// Esquema de etiquetas que se ajusta a la base de datos
// solo tiene el campo label
/////////////////////////////////////////////////////////////

const themesSchema = Joi.object().keys({
    theme: Joi.string().max(200).required().messages(joiErrorMessages),
});

export default themesSchema;
