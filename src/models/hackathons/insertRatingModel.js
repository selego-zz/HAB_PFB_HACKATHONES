// Importamos la función que devuelve una conexión con la base de datos.
import getPool from '../../db/getPool.js';

// Importamos los errores.
import generateErrorUtil from '../../utils/generateErrorUtil.js';

//////

// Función que realiza una consulta a la base de datos votar una entrada.
const insertRatingModel = async (value, hackathonId, userId) => {
    const pool = await getPool();

    // Comprobamos si ya existe un valoración previa por parte del usuario que está intentando votar.
    const [votes] = await pool.query(
        `SELECT id FROM hackathonsRatings WHERE hackathonId = ? AND userId = ?`,
        [hackathonId, userId],
    );

    // Si el usuario ya ha votado el hackathon lanzamos un error.
    if (votes.length > 0) {
        generateErrorUtil('No puedes votar dos veces el mismo hackathon', 403);
    }

    // Insertamos el voto.
    await pool.query(
        `INSERT INTO hackathonsRatings (value, hackathonId, userId) VALUES (?, ?, ?)`,
        [value, hackathonId, userId],
    );

    // Obtenemos la media de votos.
    const [votesAvg] = await pool.query(
        `SELECT AVG(value) AS avg FROM hackathonsRatings WHERE hackathonId = ?`,
        [hackathonId],
    );

    // Retornamos la media de votos.
    return Number(votesAvg[0].avg);
};

export default insertRatingModel;
