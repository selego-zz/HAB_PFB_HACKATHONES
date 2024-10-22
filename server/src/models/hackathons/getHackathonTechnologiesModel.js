import getPool from '../../db/getPool.js';

//////

const getHackathonTechnologiesModel = async (hackathonId) => {
    const pool = await getPool();

    let SQL;
    const args = [];
    if (hackathonId) {
        SQL =
            'SELECT technology FROM technologies t JOIN hackathonTechnologies h ON h.technologyId = t.id WHERE hackathonId = ?';
        args.push(hackathonId);
    } else SQL = 'SELECT technology FROM technologies';
    const [res] = await pool.query(SQL, args);
    return res;
};
export default getHackathonTechnologiesModel;
