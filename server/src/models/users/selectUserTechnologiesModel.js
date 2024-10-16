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
         WHERE ut.userId = `,
        [userId],
    );

    // Ya que el email no puede repetirse, el array de usuarios solo podrá contener un único usuario, que será un objeto en la posición 0. En caso de que no se haya encontrado a ningún usuario retornará undefined.
    return technologies;
};

export default selectUserTechnologiesModel;
