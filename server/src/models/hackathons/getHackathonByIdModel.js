import getPool from '../../db/getPool.js';
import { getRankingModel } from './index.js';

//////

const getHackathonByIdModel = async (hackathonId) => {
    const pool = await getPool();

    const [res] = await pool.query(`SELECT * FROM hackathons WHERE id = ?`, [
        hackathonId,
    ]);

    if (res.length) res[0].ranking = await getRankingModel(res[0].id);

    return res[0];
};
export default getHackathonByIdModel;
