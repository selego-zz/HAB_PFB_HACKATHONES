import getPool from '../../db/getPool.js';
import { getInscriptions } from '../../utils/index.js';

//////

// Modelo que obtiene las inscripciones de un usuario específico.
const getOrganizerHackathonsModel = async (organizerId) => {
    const pool = await getPool();

    const [enrollments] = await pool.query(
        getInscriptions() + `WHERE h.organizerId = ?`,
        [organizerId],
    );

    return enrollments;
};

export default getOrganizerHackathonsModel;
