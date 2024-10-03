import getPool from '../../db/getPool.js';

//////

// Función que realiza una consulta a la base de datos para seleccionar un usuario con un nombre de usuario dado.
const selectUserByUsernameModel = async (username) => {
    const pool = await getPool();

    // Comprobamos si hay algún usuario con el nombre de usuario proporcionado.
    const [users] = await pool.query(
        `SELECT id, username FROM users WHERE username = ?`,
        [username],
    );

    // Ya que el nombre de usuario tiene que ser único, el array de usuarios solo podrá contener un único usuario, que será un objeto en la posición 0. En caso de que no se haya encontrado a ningún usuario retornará undefined.
    return users[0];
};

export default selectUserByUsernameModel;
