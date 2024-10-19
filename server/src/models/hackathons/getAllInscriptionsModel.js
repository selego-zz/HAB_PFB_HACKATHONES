import getPool from '../../db/getPool.js';
import { generateGetInscriptionsSQL } from '../../utils/index.js';
import { getRankingModel } from './index.js';
//////

// Modelo que obtiene todas las inscripciones.
const getAllInscriptionsModel = async () => {
    const pool = await getPool();

    const [enrollments] = await pool.query(
        generateGetInscriptionsSQL('', 'administrador'),
    );
    for (const hackathon of enrollments) {
        hackathon.ranking = await getRankingModel(hackathon.id);
    }

    return enrollments;
};

export default getAllInscriptionsModel;
