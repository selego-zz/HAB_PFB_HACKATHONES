import getPool from '../../db/getPool.js';

//////

const getAllHackathonsModel = async () => {
    const pool = await getPool();

    const camposADevolver =
        'h.id, h.name, h.logo, h.online, h.hackathonDate, h.hackathonEnd';
    let sql = `
        SELECT
            ${camposADevolver}, AVG(e.rating) AS average_rating 
        FROM
            hackathons h
        LEFT JOIN
            enrollsIn e ON h.id = e.hackathonId
        GROUP BY
            ${camposADevolver}`;

    const [res] = await pool.query(sql);
    return res;
};
export default getAllHackathonsModel;
