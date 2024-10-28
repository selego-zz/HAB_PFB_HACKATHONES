import getPool from '../../db/getPool.js';

//////

// Función que realiza una consulta a la base de datos para seleccionar un usuario con un id dado.
const selectUserTechnologiesModel = async (userId) => {
    const pool = await getPool();

    // Comprobamos si hay algún usuario con el id proporcionado.
    const [technologies] = await pool.query(
        `SELECT t.technology
         FROM userTechnologies ut
         JOIN technologies t ON ut.technologyId = t.id
         WHERE ut.userId = ?`,
        [userId],
    );

    return technologies;
};

export default selectUserTechnologiesModel;
