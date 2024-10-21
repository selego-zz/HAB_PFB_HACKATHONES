import getPool from '../../db/getPool.js';

import { generateGetInscriptionsSQL } from '../../utils/index.js';
import { getRankingModel, getUsersEnrolledOnAHackathonModel } from './index.js';

//////

/////////////////////////////////////////////////////////////////
// Modelo que devuelve todos los inscritos a un hackathon
/////////////////////////////////////////////////////////////////
const getAllInscriptionsFromAHackathonModel = async (hackathonId) => {
    const pool = await getPool();

    const [enrollments] = await pool.query(
        generateGetInscriptionsSQL('WHERE hackathonId = ?', 'organizador'),
        [hackathonId],
    );

    for (const hackathon of enrollments) {
        hackathon.developers = await getUsersEnrolledOnAHackathonModel();
        hackathon.ranking = await getRankingModel(hackathon.id);
    }

    return enrollments;
};

export default getAllInscriptionsFromAHackathonModel;
