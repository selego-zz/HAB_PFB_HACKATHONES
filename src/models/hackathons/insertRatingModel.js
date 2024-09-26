// Importamos la función que devuelve una conexión con la base de datos.
import getPool from '../../db/getPool.js';

// Importamos los errores.
import { generateErrorUtil } from '../../utils/index.js';

//////

// Función que realiza una consulta a la base de datos votar una entrada.
const insertRatingModel = async (rating, hackathonId, userId) => {
    const pool = await getPool();

    // Comprobamos si ya existe un valoración previa por parte del usuario que está intentando votar.
    const [ratings] = await pool.query(
        `SELECT id FROM enrollsin WHERE hackathonId = ? AND userId = ?`,
        [hackathonId, userId],
    );

    // Si el usuario ya ha votado el hackathon lanzamos un error.
    if (ratings.length > 0) {
        generateErrorUtil('No puedes votar dos veces el mismo hackathon', 403);
    }

    // Insertamos el voto.
    await pool.query(
        `INSERT INTO enrollsin (rating, hackathonId, userId) VALUES (?, ?, ?)`,
        [rating, hackathonId, userId],
    );

    // Obtenemos la media de votos.
    const [ratingsAvg] = await pool.query(
        `SELECT AVG(rating) AS avg FROM enrollsin WHERE hackathonId = ?`,
        [hackathonId],
    );

    // Retornamos la media de votos.
    return Number(ratingsAvg[0].avg);
};

export default insertRatingModel;
