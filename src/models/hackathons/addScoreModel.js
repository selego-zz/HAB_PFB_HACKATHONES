// Importamos la función que devuelve una conexión con la base de datos.
import getPool from '../../db/getPool.js';

// Importamos los errores.
import generateErrorUtil from '../../utils/generateErrorUtil.js';

//////

// Consulta a la BD para añadir puntuación a los participantes del hackathon.
const addScoreModel = async (userId, hackathonId, score) => {
    const pool = await getPool();

    // Comprobamos si ya existe una puntuación para ese usuario.
    const [scores] = await pool.query(
        `SELECT id FROM enrollsin WHERE hackathonId = ? AND userId = ?`,
        [hackathonId, userId],
    );

    // Si el usuario ya ha sido puntuado en el hackathon en cuestión, lanzamos un error.
    if (scores.length > 0) {
        generateErrorUtil('Este participante ya ha sido puntuado', 403);
    }

    // Insertamos la puntuación.
    await pool.query(
        `INSERT INTO enrollsin (score, hackathonId, userId) VALUES (?, ?, ?)`,
        [score, hackathonId, userId],
    );
};

export default addScoreModel;
