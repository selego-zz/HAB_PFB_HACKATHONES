// Importamos la conexión a la base de datos.
import getPool from '../../db/getPool.js';

//////

// Modelo que obtiene todas las inscripciones.
const getAllInscriptionsModel = async () => {
    const pool = await getPool();

    const [enrollments] = await pool.query(`
        SELECT e.id, e.userId, e.hackathonId, e.inscriptionDate, e.attended, e.rating, e.score,
        u.username, h.name AS hackathonName
        FROM enrollsin e
        JOIN users u ON e.userId = u.id
        JOIN hackathons h ON e.hackathonId = h.id
    `);

    return enrollments;
};

export default getAllInscriptionsModel;
