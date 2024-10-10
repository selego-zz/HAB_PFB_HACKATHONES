import getPool from '../../db/getPool.js';

//////

// Modelo que obtiene las inscripciones de un usuario específico.
const getOrganizerHackathonsModel = async (organizerId) => {
    const pool = await getPool();

    const [enrollments] = await pool.query(
        `
        SELECT e.id, e.hackathonId, e.inscriptionDate, e.attended, e.rating, e.score,
        h.name AS hackathonName,
        u.id AS userId, u.username
        FROM enrollsin e
        JOIN hackathons h ON e.hackathonId = h.id
        JOIN users u ON e.userId = u.id
        WHERE h.organizerId = ?
    `,
        [organizerId],
    );

    return enrollments;
};

export default getOrganizerHackathonsModel;
