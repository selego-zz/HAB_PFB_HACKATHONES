import getPool from '../../db/getPool.js';

//////

const getHackathonByIdModel = async (hackathonId) => {
    const pool = await getPool();

    const [res] = await pool.query(`SELECT * FROM hackathons WHERE id = ?`, [
        hackathonId,
    ]);

    return res[0];
};
export default getHackathonByIdModel;
