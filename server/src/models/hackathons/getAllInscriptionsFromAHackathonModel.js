import getPool from '../../db/getPool.js';

//////

/////////////////////////////////////////////////////////////////
// Modelo que devuelve todos los inscritos a un hackathon
/////////////////////////////////////////////////////////////////
const getAllInscriptionsFromAHackathonModel = async (hackathonId) => {
    const pool = await getPool();

    const [enrollments] = await pool.query(
        `
        SELECT e.id, e.userId, e.hackathonId, e.inscriptionDate, e.attended, e.rating, e.score,
        u.username, h.name AS hackathonName
        FROM enrollsin e
        JOIN users u ON e.userId = u.id
        JOIN hackathons h ON e.hackathonId = h.id
        WHERE hackathonId = ?
    `,
        [hackathonId],
    );

    return enrollments;
};

export default getAllInscriptionsFromAHackathonModel;
