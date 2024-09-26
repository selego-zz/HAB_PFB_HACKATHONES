import Joi from '@hapi/joi';
import joiErrorMessages from '../joiErrorMessages.js';

//////////////////////////////////////////////////////////////
// Esquema de etiquetas que se ajusta a la base de datos
// solo tiene el campo label
/////////////////////////////////////////////////////////////

const technologiesSchema = Joi.object().keys({
    technology: Joi.string().max(200).required().messages(joiErrorMessages),
});

export default technologiesSchema;
