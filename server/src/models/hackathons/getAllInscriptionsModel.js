import getPool from '../../db/getPool.js';
import { getInscriptions } from '../../utils/index.js';
//////

// Modelo que obtiene todas las inscripciones.
const getAllInscriptionsModel = async () => {
    const pool = await getPool();

    const [enrollments] = await pool.query(
        getInscriptions('', 'administrador'),
    );

    return enrollments;
};

export default getAllInscriptionsModel;
