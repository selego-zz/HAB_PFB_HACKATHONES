import getPool from '../../db/getPool.js';
import {
    getHackathonTechnologiesModel,
    getHackathonThemesModel,
    getRankingModel,
} from './index.js';

//////

const getAllHackathonsModel = async () => {
    const pool = await getPool();

    const camposADevolver = `
        h.id, h.name, h.logo, h.online, 
        h.hackathonDate, h.hackathonEnd, 
        h.location, h.updatedAt, h.description, h.requirements
    `;

    let sql = `
        SELECT
            ${camposADevolver}, AVG(e.rating) AS average_rating 
        FROM
            hackathons h
        LEFT JOIN
            enrollsIn e ON h.id = e.hackathonId
        GROUP BY
            h.id, h.name, h.logo, h.online, 
            h.hackathonDate, h.hackathonEnd, 
            h.location, h.updatedAt, h.description, h.requirements
    `;

    const [res] = await pool.query(sql);

    for (const hackathon of res) {
        console.log('getAllHackathonsModel ' + hackathon.id);

        hackathon.ranking = await getRankingModel(hackathon.id);
        hackathon.technologies = await getHackathonTechnologiesModel(
            hackathon.id,
        );
        hackathon.themes = await getHackathonThemesModel(hackathon.id);

        if (hackathon.id === 18) {
            console.log(await getHackathonTechnologiesModel(hackathon.id));
        }
    }

    return res;
};

export default getAllHackathonsModel;
