import getPool from '../../db/getPool.js';
import { selectUserTechnologiesModel } from './index.js';
//////

// Función que realiza una consulta a la base de datos para seleccionar un usuario con un nombre de usuario dado.
const selectUserByUsernameModel = async (username) => {
    const pool = await getPool();

    // Comprobamos si hay algún usuario con el nombre de usuario proporcionado.
    const [users] = await pool.query(
        `SELECT id, username FROM users WHERE username = ?`,
        [username],
    );

    if (users.length) {
        //buscamos las tecnologías del usuario y las metemos en technologies
        users[0].technologies = selectUserTechnologiesModel(users[0].id);
    }

    return users[0];
};

export default selectUserByUsernameModel;
