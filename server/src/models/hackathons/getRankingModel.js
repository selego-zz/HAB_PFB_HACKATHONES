import getPool from '../../db/getPool.js';

//////

const getRankingModel = async (hackathonId) => {
    const pool = await getPool();

    let [res] = await pool.query(
        `SELECT username, score FROM enrollsIn JOIN users ON userId = users.id WHERE hackathonId = ? ORDER BY score DESC`,
        [hackathonId],
    );

    const ranking = [];

    for (let i = 1; i <= 3; i++) {
        if (res.length) {
            res[0].position = i;
            ranking.push(res[0]);

            res = res.slice(1);
        } else break;
    }

    return ranking;
};
export default getRankingModel;
