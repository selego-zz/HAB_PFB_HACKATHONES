import getPool from '../../db/getPool.js';

//////

const getHackathonByIdModel = async (hackathonId) => {
    const pool = await getPool();

    const [res] = await pool.query('GET * FROM hackathons WHERE id = ?', [
        hackathonId,
    ]);
    return res;
};
export default getHackathonByIdModel;
