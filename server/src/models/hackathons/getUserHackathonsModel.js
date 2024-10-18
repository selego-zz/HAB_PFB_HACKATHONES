import getPool from '../../db/getPool.js';
import { generateGetInscriptionsSQL } from '../../utils/index.js';

//////

// Modelo que obtiene las inscripciones de un usuario específico.
const getUserHackathonsModel = async (userId) => {
    const pool = await getPool();

    const [enrollments] = await pool.query(
        generateGetInscriptionsSQL(`WHERE e.userId = ?`, 'desarrollador'),
        [userId],
    );

    return enrollments;
};

export default getUserHackathonsModel;
