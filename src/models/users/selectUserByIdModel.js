// Importamos la función que devuelve una conexión con la base de datos.
import getPool from '../../db/getPool.js';

//////

// Función que realiza una consulta a la base de datos para seleccionar un usuario con un id dado.
const selectUserByIdModel = async (userId) => {
    const pool = await getPool();

    // Comprobamos si hay algún usuario con el id proporcionado.
    const [users] = await pool.query(
        `SELECT id, firstName, lastName, username, avatar, email FROM users WHERE id = ?`,
        [userId],
    );

    // Ya que el email no puede repetirse, el array de usuarios solo podrá contener un único usuario, que será un objeto en la posición 0. En caso de que no se haya encontrado a ningún usuario retornará undefined.
    return users[0];
};

export default selectUserByIdModel;
