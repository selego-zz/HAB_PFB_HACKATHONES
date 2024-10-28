import getPool from '../../db/getPool.js';

//////

const getHackathonThemesModel = async (hackathonId) => {
    const pool = await getPool();

    let SQL;
    const args = [];
    if (hackathonId) {
        SQL =
            'SELECT theme FROM themes t JOIN hackathonThemes h ON h.themeId = t.id WHERE hackathonId = ?';
        args.push(hackathonId);
    } else SQL = 'SELECT theme FROM themes';
    const [res] = await pool.query(SQL, args);
    return res;
};
export default getHackathonThemesModel;
