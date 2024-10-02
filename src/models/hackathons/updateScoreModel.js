// Importamos la función que devuelve una conexión con la base de datos.
import getPool from '../../db/getPool.js';

//////

// Consulta a la BD para actualizar la puntuación de los participantes del hackathon.
const updateScoreModel = async (developerId, hackathonId, score) => {
    const pool = await getPool();

    // Actualizamos la puntuación.
    const [res] = await pool.query(
        `UPDATE enrollsIn SET score = ?, updatedAt = NOW() WHERE hackathonId = ? AND userId = ?`,
        [score, hackathonId, developerId],
    );
    return res.affectedRows;
};

export default updateScoreModel;
