import getPool from '../../db/getPool.js';

import { generateGetInscriptionsSQL } from '../../utils/index.js';
import { getRankingModel, getUsersEnrolledOnAHackathonModel } from './index.js';

//////

/////////////////////////////////////////////////////////////////
// Modelo que devuelve todos los inscritos a un hackathon
/////////////////////////////////////////////////////////////////
const getAllInscriptionsFromAHackathonModel = async (
    hackathonId,
    userId,
    role,
) => {
    const pool = await getPool();

    let where = 'WHERE hackathonId = ?';
    let args = [hackathonId];

    if (role === 'desarrollador') {
        where += ' AND userId = ?';
        args.push(userId);
    }

    const [enrollments] = await pool.query(
        generateGetInscriptionsSQL(where, role),
        args,
    );

    for (const hackathon of enrollments) {
        hackathon.developers =
            await getUsersEnrolledOnAHackathonModel(hackathonId);
        hackathon.ranking = await getRankingModel(hackathonId);
    }

    return enrollments;
};

export default getAllInscriptionsFromAHackathonModel;
