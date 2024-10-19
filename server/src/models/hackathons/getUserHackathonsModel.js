import getPool from '../../db/getPool.js';
import { generateGetInscriptionsSQL } from '../../utils/index.js';
import { getRankingModel, getOwnPosition } from './index.js';

//////

// Modelo que obtiene las inscripciones de un usuario específico.
const getUserHackathonsModel = async (userId) => {
    const pool = await getPool();

    const [enrollments] = await pool.query(
        generateGetInscriptionsSQL(`WHERE e.userId = ?`, 'desarrollador'),
        [userId],
    );
    for (const hackathon of enrollments) {
        hackathon.ranking = await getRankingModel(hackathon.id);
        hackathon.position = 'No valorado';
        if (hackathon.score > 0)
            hackathon.position = await getOwnPosition(hackathon.id, userId);
    }

    return enrollments;
};

export default getUserHackathonsModel;
