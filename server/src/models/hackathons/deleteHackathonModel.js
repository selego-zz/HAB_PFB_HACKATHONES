import getPool from '../../db/getPool.js';

//////

// Modelo que elimina un hackathon por su ID.
const deleteHackathonModel = async (hackathonId) => {
    const pool = await getPool();

    // Eliminamos todo lo que depende del hackathon.
    await pool.query(
        `DELETE FROM hackathonTechnologies WHERE hackathonId = ?`,
        [hackathonId],
    );
    await pool.query(`DELETE FROM hackathonThemes WHERE hackathonId = ?`, [
        hackathonId,
    ]);
    await pool.query(`DELETE FROM enrollsIn WHERE hackathonId = ?`, [
        hackathonId,
    ]);

    //eliminamos hackathon
    const [res] = await pool.query(`DELETE FROM hackathons WHERE id = ?`, [
        hackathonId,
    ]);

    return res.affectedRows;
};

export default deleteHackathonModel;
