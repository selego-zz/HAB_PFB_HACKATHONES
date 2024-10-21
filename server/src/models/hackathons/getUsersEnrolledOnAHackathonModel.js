import getPool from '../../db/getPool.js';

////////////////////////////////////////////////////////////////////
// Modelo para obtener todos los usuarios inscritos a un hackathon.
//   la información que devuelve es la misma que añadiría
//   generateGetInscriptionsSQL si se llamara para desarrollador
////////////////////////////////////////////////////////////////////

const getUsersEnrolledOnAHackathonModel = async (hackathonId) => {
    const pool = await getPool();

    // Consulta para verificar si el usuario está inscrito en el hackathon
    const [enrolledUsers] = await pool.query(
        `SELECT
            e.rating,
            e.score,
            e.inscriptionDate,
            e.attended,
            u.username, 
            u.avatar,
            u.id AS userId
        FROM enrollsIn e
        JOIN users u ON e.userId = u.id
        WHERE hackathonId = ?`,
        [hackathonId],
    );

    return enrolledUsers;
};

export default getUsersEnrolledOnAHackathonModel;
