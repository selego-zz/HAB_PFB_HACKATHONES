import getPool from '../../db/getPool.js';
import { getInscriptions } from '../../utils/index.js';

//////

// Modelo que obtiene las inscripciones de un usuario específico.
const getUserHackathonsModel = async (userId) => {
    const pool = await getPool();

    const [enrollments] = await pool.query(
        getInscriptions() + `WHERE e.userId = ?`,
        [userId],
    );

    return enrollments;
};

export default getUserHackathonsModel;
