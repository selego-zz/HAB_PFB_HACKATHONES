import getPool from '../../db/getPool.js';

//////

const getOwnPosition = async (hackathonId, userId) => {
    const pool = await getPool();

    let [res] = await pool.query(
        `SELECT COUNT(*) + 1 AS position
            FROM enrollsIn
            WHERE hackathonId = ?
            AND score > (
                SELECT score
                    FROM enrollsIn
                    WHERE hackathonId = ? AND userId = ?)`,
        [hackathonId, hackathonId, userId],
    );
    return res[0].position;
};
export default getOwnPosition;
