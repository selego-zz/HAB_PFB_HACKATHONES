import getPool from '../../db/getPool.js';

//////

// Función que realiza una consulta a la base de datos para insertar un nuevo usuario.
const addHackathonInscriptionModel = async (hackathonId, userId) => {
    const pool = await getPool();

    // Insertamos el hackathon.
    const [res] = await pool.query(
        `INSERT INTO enrollsIn (userId,
        hackathonid,
        inscriptiondate) VALUES (?, ?, NOW())`,
        [userId, hackathonId],
    );
    return res.insertId;
};

export default addHackathonInscriptionModel;
