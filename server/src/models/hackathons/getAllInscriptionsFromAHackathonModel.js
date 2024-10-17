import getPool from '../../db/getPool.js';

//////

/////////////////////////////////////////////////////////////////
// Modelo que devuelve todos los inscritos a un hackathon
/////////////////////////////////////////////////////////////////
const getAllInscriptionsFromAHackathonModel = async (hackathonId) => {
    const pool = await getPool();

    const [enrollments] = await pool.query(
        `
        SELECT e.id, e.hackathonId, e.inscriptionDate, e.attended, e.rating, e.score,
        h.name AS hackathonName,
        u.id AS userId, u.username, u.avatar
        FROM enrollsin e
        JOIN hackathons h ON e.hackathonId = h.id
        JOIN users u ON e.userId = u.id
        WHERE hackathonId = ?
    `,
        [hackathonId],
    );

    return enrollments;
};

export default getAllInscriptionsFromAHackathonModel;
