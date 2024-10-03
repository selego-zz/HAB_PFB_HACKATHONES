import getPool from '../../db/getPool.js';

//////

// Modelo que obtiene las inscripciones de un usuario específico.
const getOrganizerHackathonsModel = async (organizerId) => {
    const pool = await getPool();

    const [enrollments] = await pool.query(
        `
        SELECT e.id, e.hackathonId, e.inscriptionDate, e.attended, e.rating, e.score,
        h.name AS hackathonName
        FROM enrollsin e
        JOIN hackathons h ON e.hackathonId = h.id
        WHERE h.organizerId = ?
    `,
        [organizerId],
    );

    return enrollments;
};

export default getOrganizerHackathonsModel;
