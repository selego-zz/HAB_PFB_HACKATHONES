import Joi from '@hapi/joi';
import joiErrorMessages from '../joiErrorMessages.js';

/*
 *    CREATE TABLE IF NOT EXISTS hackathons(
 *         organizerId INT UNSIGNED NOT NULL,
 *
 *         inscriptionDate DATETIME NOT NULL,
 *         inscriptionEnd DATETIME NOT NULL,
 *         date DATETIME NOT NULL,
 *         end DATETIME NOT NULL,
 *
 *         maxParticipants INT UNSIGNED,
 *         prices DECIMAL(9, 2),
 *         logo VARCHAR(100),
 *         online BOOLEAN DEFAULT TRUE,
 *         location VARCHAR(200),
 *         documentation VARCHAR(100),
 *
 *         id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
 *         FOREIGN KEY (organizerId) REFERENCES users(id),
 *         createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
 *         updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
 *     )`;
 */

///////////////////////////////////////////////////////////////
// Esquema de hackaton que se ajusta a la base de datos
// Tiene todos los campos no automáticos de la tabla hackathon
//////////////////////////////////////////////////////////////

const hackathonFilterSchema = Joi.object().keys({
    organizerId: Joi.number().optional(),
    inscriptionDate: Joi.date().optional().messages(joiErrorMessages),
    inscriptionEnd: Joi.date().optional().messages(joiErrorMessages),
    hackathonDate: Joi.date().optional().messages(joiErrorMessages),
    hackathonEnd: Joi.date().optional().messages(joiErrorMessages),
    maxParticipants: Joi.number().optional().messages(joiErrorMessages),
    prices: Joi.number().optional().messages(joiErrorMessages),
    logo: Joi.string().max(100).optional().messages(joiErrorMessages),
    online: Joi.boolean().optional().messages(joiErrorMessages),
    location: Joi.string().max(200).optional().messages(joiErrorMessages),
    documentation: Joi.string().max(100).optional().messages(joiErrorMessages),
    themes,
    technologies,
});

export default hackathonFilterSchema;
