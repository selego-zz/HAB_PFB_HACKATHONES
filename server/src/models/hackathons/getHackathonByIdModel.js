import getPool from '../../db/getPool.js';
import {
    getHackathonTechnologiesModel,
    getHackathonThemesModel,
    getRankingModel,
} from './index.js';

//////

const getHackathonByIdModel = async (hackathonId) => {
    const pool = await getPool();

    const [res] = await pool.query(`SELECT * FROM hackathons WHERE id = ?`, [
        hackathonId,
    ]);

    if (res.length) {
        res[0].ranking = await getRankingModel(hackathonId);
        res[0].technologies = await getHackathonTechnologiesModel(hackathonId);
        res[0].themes = await getHackathonThemesModel(hackathonId);
    }

    return res[0];
};
export default getHackathonByIdModel;
