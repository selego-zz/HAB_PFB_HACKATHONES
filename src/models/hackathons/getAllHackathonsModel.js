import getPool from '../../db/getPool.js';

//////

const getAllHackathonsModel = async () => {
    const pool = await getPool();

    const [res] = await pool.query(
        'SELECT name, logo, online, hackathonDate, hackathonEnd FROM hackathons',
    );
    return res;
};
export default getAllHackathonsModel;
