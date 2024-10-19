import getPool from '../../db/getPool.js';
import { generateGetInscriptionsSQL } from '../../utils/index.js';
import { getRankingModel } from './index.js';

//////

// Modelo que obtiene las inscripciones de un usuario específico.
const getUserHackathonsModel = async (userId) => {
    const pool = await getPool();

    const [enrollments] = await pool.query(
        generateGetInscriptionsSQL(`WHERE e.userId = ?`, 'desarrollador'),
        [userId],
    );
    for (const hackathon of enrollments) {
        hackathon.ranking = getRankingModel(hackathon.id);
    }

    return enrollments;
};

export default getUserHackathonsModel;
