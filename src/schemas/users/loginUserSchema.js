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
// Esquema para loguearse, solo mail y contraseña
/////////////////////////////////////////////////////////////

const loginUserSchema = Joi.object().keys({
    email: Joi.string().email().max(100).required().messages(joiErrorMessages),
    password: Joi.string().max(100).required().messages(joiErrorMessages),
});

export default loginUserSchema;
