// Importamos la función que devuelve una conexión con la base de datos.
import getPool from '../../db/getPool.js';

// Importamos los errores.
import { generateErrorUtil } from '../../utils/index.js';

//////

// Función que realiza una consulta a la base de datos para actualizar la votación de un hackathon.
const updateRatingModel = async (rating, hackathonId, userId) => {
    const pool = await getPool();

    // Comprobamos si el usuario está inscrito en el hackathon (debe existir un registro en `enrollsin`).
    const [existingEnrollment] = await pool.query(
        `SELECT id FROM enrollsin WHERE hackathonId = ? AND userId = ?`,
        [hackathonId, userId],
    );

    // Si no existe un registro de inscripción, lanzamos un error.
    if (existingEnrollment.length === 0) {
        generateErrorUtil(
            'El usuario no está inscrito en este hackathon.',
            403,
        );
    }

    // Actualizamos el rating del usuario para este hackathon.
    await pool.query(
        `UPDATE enrollsin SET rating = ?, updatedAt = NOW() WHERE hackathonId = ? AND userId = ?`,
        [rating, hackathonId, userId],
    );

    // Obtenemos la media de votos después de la actualización.
    const [ratingsAvg] = await pool.query(
        `SELECT AVG(rating) AS avg FROM enrollsin WHERE hackathonId = ?`,
        [hackathonId],
    );

    // Retornamos la media de votos.
    return Number(ratingsAvg[0].avg);
};

export default updateRatingModel;
