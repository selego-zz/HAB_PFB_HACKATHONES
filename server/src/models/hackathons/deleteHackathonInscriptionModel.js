import getPool from '../../db/getPool.js';

//////

// Modelo que elimina un hackathon por su ID.
const deleteHackathonInscriptionModel = async (userId, hackathonId) => {
    const pool = await getPool();

    // Eliminamos el hackathon por su ID.
    const [res] = await pool.query(
        `DELETE FROM enrollsIn WHERE userid = ? AND hackathonid = ?`,
        [userId, hackathonId],
    );
    return res.affectedRows;
};

export default deleteHackathonInscriptionModel;
