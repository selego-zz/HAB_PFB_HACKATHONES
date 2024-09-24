import Joi from '@hapi/joi';
import joiErrorMessages from './joiErrorMessages.js';

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

const hackathonSchema = Joi.object().keys({
    organizerId: Joi.number(),
    //los mensajes de date.greater las pongo aquí por que dependen de la variable
    inscriptionDate: Joi.date().required().messages(joiErrorMessages),
    inscriptionEnd: Joi.date()
        .greater(Joi.ref('inscriptionDate'))
        .required()
        .messages({
            ...joiErrorMessages,
            'date.greater':
                'La fecha de finalización de inscripción debe ser posterior a la fecha de inicio de inscripción',
        }),
    //permito que se inscriba gente aunque haya empezado el hackathon
    date: Joi.date().required().messages(joiErrorMessages),
    end: Joi.date()
        .greater(Joi.ref('date'))
        .required()
        .messages({
            ...joiErrorMessages,
            'date.greater':
                'La fecha de finalización debe ser posterior a la fecha de inicio',
        }),

    maxParticipants: Joi.number().optional().messages(joiErrorMessages),
    prices: Joi.number().optional().messages(joiErrorMessages),
    logo: Joi.string().max(100).optional().messages(joiErrorMessages),
    online: Joi.boolean().optional().messages(joiErrorMessages),
    location: Joi.string().max(200).optional().messages(joiErrorMessages),
    documentation: Joi.string().max(100).optional().messages(joiErrorMessages),
});

export default hackathonSchema;
