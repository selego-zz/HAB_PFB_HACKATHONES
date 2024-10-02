import getPool from '../../db/getPool.js';

//////

const getHackathonTechnologiesModel = async () => {
    const pool = await getPool();

    const [res] = await pool.query('SELECT technology FROM technologies');
    return res;
};
export default getHackathonTechnologiesModel;
