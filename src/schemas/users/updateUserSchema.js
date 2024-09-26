import Joi from '@hapi/joi';
import joiErrorMessages from '../joiErrorMessages.js';

/*
 *    CREATE TABLE IF NOT EXISTS users(
 *
 *      username VARCHAR(50) UNIQUE,
 *      email VARCHAR(100) UNIQUE NOT NULL,
 *      password VARCHAR(100) NOT NULL,
 *      firstName VARCHAR(50),
 *      lastName VARCHAR(50),
 *      avatar VARCHAR(100),
 *      role ENUM ('administrador', 'organizador', 'desarrollador') NOT NULL,
 *
 *      id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
 *      recoverPassCode CHAR(30),
 *      activationCode CHAR(30),
 *      active BOOLEAN DEFAULT FALSE,
 *      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
 *      updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
 *    )`;
 */

//////////////////////////////////////////////////////////////
// Esquema de usuario que se ajusta a la base de datos
// todos los datos son opcionales, por que no tiene por qué
//       cambiar todos los campos
/////////////////////////////////////////////////////////////

const updateUserSchema = Joi.object().keys({
    username: Joi.string().max(50).optional().messages(joiErrorMessages),
    email: Joi.string().email().max(100).optional().messages(joiErrorMessages),
    password: Joi.string().max(100).optional().messages(joiErrorMessages),
    firstName: Joi.string().max(50).optional().messages(joiErrorMessages),
    lastName: Joi.string().max(50).optional().messages(joiErrorMessages),
    avatar: Joi.string().max(100).optional().messages(joiErrorMessages),
    role: Joi.string()
        .valid('administrador', 'organizador', 'desarrollador')
        .optional()
        .messages(joiErrorMessages),
});

export default updateUserSchema;