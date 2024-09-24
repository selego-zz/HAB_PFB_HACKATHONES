import Joi from '@hapi/joi';
import joiErrorMessages from './joiErrorMessages.js';

/*
 *    CREATE TABLE IF NOT EXISTS hastags(
 *         userId INT UNSIGNED,
 *         hackathonId INT UNSIGNED,
 *         tagId INT UNSIGNED,
 *
 *         FOREIGN KEY (tagId) REFERENCES tags(id),
 *         FOREIGN KEY (hackathonId) REFERENCES hackathons(id),
 *         FOREIGN KEY (userId) REFERENCES users(id),
 *         id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
 *         createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
 *         updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
 *    )`;
 */

//////////////////////////////////////////////////////////////
// Esquema para asignar tags a un usuario o hackathon
// Solo tiene referencias a tagId, userId y hackathonId
// no permite que haya a la vez un usuario y un hackathon
/////////////////////////////////////////////////////////////

const hasTagsSchema = Joi.object()
    .keys({
        userId: Joi.number().messages(joiErrorMessages),
        hackathonId: Joi.number().messages(joiErrorMessages),
        tagId: Joi.number().required().messages(joiErrorMessages),
    })
    .xor('userId', 'hackathonId');

export default hasTagsSchema;
