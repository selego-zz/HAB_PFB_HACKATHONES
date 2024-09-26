import Joi from '@hapi/joi';
import joiErrorMessages from './joiErrorMessages.js';

/*
 *    CREATE TABLE IF NOT EXISTS enrollsIn(
 *         userId INT UNSIGNED NOT NULL,
 *         hackathonId INT UNSIGNED NOT NULL,
 *         inscriptionDate DATETIME NOT NULL,
 *
 *         rating TINYINT UNSIGNED,
 *         score INT UNSIGNED,
 *         attended BOOLEAN,
 *
 *         FOREIGN KEY (userId) REFERENCES users(id),
 *         FOREIGN KEY (hackathonId) REFERENCES hackathons(id),
 *         id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
 *         createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
 *         updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
 *    )`;
 */

//////////////////////////////////////////////////////////////
// Esquema de inscipción en un hackaton
// Tiene los campos userId, hackathonId e inscriptionDate
// el resto de datos no se saben hasta que acabe el hackathon
/////////////////////////////////////////////////////////////

const enrollsInSchema = Joi.object().keys({
    userId: Joi.number().required().messages(joiErrorMessages),
    inscriptionDate: Joi.date().required().messages(joiErrorMessages),
});

export default enrollsInSchema;
