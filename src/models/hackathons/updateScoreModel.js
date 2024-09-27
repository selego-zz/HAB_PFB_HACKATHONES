// Importamos la función que devuelve una conexión con la base de datos.
import getPool from '../../db/getPool.js';

// Importamos los errores.
import generateErrorUtil from '../../utils/generateErrorUtil.js';

//////

// Consulta a la BD para actualizar la puntuación de los participantes del hackathon.
const updateScoreModel = async (userId, hackathonId, score) => {
    const pool = await getPool();

    // Comprobamos si el usuario está inscrito en el hackathon.
    const [enrollments] = await pool.query(
        `SELECT id FROM enrollsIn WHERE hackathonId = ? AND userId = ?`,
        [hackathonId, userId],
    );

    // Si el usuario no está inscrito, lanzamos un error.
    if (enrollments.length === 0) {
        throw generateErrorUtil(
            'El usuario no está inscrito en este hackathon',
            404,
        );
    }

    // Actualizamos la puntuación.
    await pool.query(
        `UPDATE enrollsIn SET score = ?, updatedAt = NOW() WHERE hackathonId = ? AND userId = ?`,
        [score, hackathonId, userId],
    );
};

export default updateScoreModel;
