import getPool from '../../db/getPool.js';

/////////////////////////////////////////////////////////////////
// Modelo para obtener la inscripción de un usuario en un hackathon
// Recibe el ID del usuario (userId) y el ID del hackathon (hackathonId)
// Devuelve el registro de la inscripción si existe, o `undefined` si no.
/////////////////////////////////////////////////////////////////

const getEnrollmentModel = async (userId, hackathonId) => {
    const pool = await getPool();

    // Consulta para verificar si el usuario está inscrito en el hackathon
    const [rows] = await pool.query(
        'SELECT * FROM enrollsIn WHERE userId = ? AND hackathonId = ?',
        [userId, hackathonId],
    );

    // Si no encuentra la inscripción, devuelve undefined
    if (rows.length === 0) {
        return undefined;
    }

    // Devuelve el registro de la inscripción del usuario en el hackathon
    return rows[0];
};

export default getEnrollmentModel;
