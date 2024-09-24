import Joi from '@hapi/joi';
import joiErrorMessages from './joiErrorMessages.js';

/*
 *    CREATE TABLE IF NOT EXISTS tags(
 *         label varchar(100) NOT NULL,
 *
 *         id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
 *         createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
 *         updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
 *    )`;
 */

//////////////////////////////////////////////////////////////
// Esquema de etiquetas que se ajusta a la base de datos
// solo tiene el campo label
/////////////////////////////////////////////////////////////

const tagSchema = Joi.object().keys({
    label: Joi.string().max(100).required().messages(joiErrorMessages),
});

export default tagSchema;
