import getPool from '../../db/getPool.js';

/////////////////////////////////////////////////////////////////
// Modelo para obtener el máximo premio.
/////////////////////////////////////////////////////////////////

const getMaxPrizeModel = async () => {
    const pool = await getPool();

    // Consulta para verificar si el usuario está inscrito en el hackathon
    const [rows] = await pool.query(
        'SELECT max(prizes) as maxPrize FROM hackathons',
    );
    // Devuelve el registro de la inscripción del usuario en el hackathon
    return rows[0].maxPrize;
};

export default getMaxPrizeModel;
