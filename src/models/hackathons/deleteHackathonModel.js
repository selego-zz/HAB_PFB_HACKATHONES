// Importamos la conexión a la base de datos.
import getPool from '../../db/getPool.js';

//////

// Modelo que elimina un hackathon por su ID.
const deleteHackathonModel = async (hackathonId) => {
    const pool = await getPool();

    // Eliminamos el hackathon por su ID.
    const [res] = await pool.query(`DELETE FROM hackathons WHERE id = ?`, [
        hackathonId,
    ]);
    return res.affectedRows;
};

export default deleteHackathonModel;
