import getPool from '../../db/getPool.js';

//////

// Modelo que obtiene todas las inscripciones.
const getAllInscriptionsModel = async () => {
    const pool = await getPool();

    const [enrollments] = await pool.query(`
          SELECT e.id, e.hackathonId, e.inscriptionDate, e.attended, e.rating, e.score,
        h.name AS hackathonName,
        u.id AS userId, u.username, u.avatar
        FROM enrollsin e
        JOIN hackathons h ON e.hackathonId = h.id
        JOIN users u ON e.userId = u.id
    `);

    return enrollments;
};

export default getAllInscriptionsModel;
