import getPool from '../../db/getPool.js';

//////

const getHackathonThemesModel = async () => {
    const pool = await getPool();

    const [res] = await pool.query('SELECT theme FROM themes');
    return res;
};
export default getHackathonThemesModel;
