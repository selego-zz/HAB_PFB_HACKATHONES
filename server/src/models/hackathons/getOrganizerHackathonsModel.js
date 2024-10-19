import getPool from '../../db/getPool.js';
import { generateGetInscriptionsSQL } from '../../utils/index.js';
import { getRankingModel } from './index.js';

//////

// Modelo que obtiene las inscripciones de un usuario específico.
const getOrganizerHackathonsModel = async (organizerId) => {
    const pool = await getPool();

    const [enrollments] = await pool.query(
        generateGetInscriptionsSQL(`WHERE h.organizerId = ?`, 'organizador'),
        [organizerId],
    );
    for (const hackathon of enrollments) {
        hackathon.ranking = await getRankingModel(hackathon.id);
    }

    return enrollments;
};

export default getOrganizerHackathonsModel;
