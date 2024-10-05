import getPool from '../../db/getPool.js';

//////

// Función que realiza una consulta a la base de datos para seleccionar un usuario con un id dado.
const selectAllUsersModel = async (userId) => {
    const pool = await getPool();

    const [users] = await pool.query(
        `SELECT id,username,email,avatar,firstName,lastName,role,biography,linkedIn,active, DATETIME DEFAULT CURRENT_TIMESTAMP,
        updatedAt,lastAuthUpdate FROM users`,
        [userId],
    );

    // Ya que el email no puede repetirse, el array de usuarios solo podrá contener un único usuario, que será un objeto en la posición 0. En caso de que no se haya encontrado a ningún usuario retornará undefined.
    return users;
};

export default selectAllUsersModel;
