import getPool from '../../db/getPool.js';

import { generateGetInscriptionsSQL } from '../../utils/index.js';
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

    return enrollments;
};

export default getAllInscriptionsFromAHackathonModel;
