import getPool from '../../db/getPool.js';

//////

// Función que realiza una consulta a la base de datos para devolver la última actualización de autorización de un usuario.
const getLastAuthUpdateModel = async (userId) => {
    const pool = await getPool();

    // Comprobamos si hay algún usuario con el id de usuario proporcionado.
    const [users] = await pool.query(
        `SELECT lastAuthUpdate FROM users WHERE id = ?`,
        [userId],
    );

    // Ya que el id de usuario tiene que ser único, el array de usuarios solo podrá contener un único usuario, que será un objeto en la posición 0. En caso de que no se haya encontrado a ningún usuario retornará undefined.
    return users[0].lastAuthUpdate;
};

export default getLastAuthUpdateModel;
