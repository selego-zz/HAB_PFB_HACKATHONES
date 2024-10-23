import getPool from '../../db/getPool.js';
import { selectUserTechnologiesModel } from './index.js';

//////

// Función que realiza una consulta a la base de datos para seleccionar un usuario con un email dado.
const selectUserByEmailModel = async (email) => {
    const pool = await getPool();

    // Comprobamos si hay algún usuario con el email proporcionado.
    const [users] = await pool.query(`SELECT * FROM users WHERE email = ?`, [
        email,
    ]);
    console.log(users);

    if (users.length) {
        //buscamos las tecnologías del usuario y las metemos en technologies
        users[0].technologies = selectUserTechnologiesModel(users[0].id);
    }

    // Ya que el email tiene que ser único, el array de usuarios solo podrá contener un único usuario, que será un objeto en la posición 0. En caso de que no se haya encontrado a ningún usuario retornará undefined.
    return users[0];
};

export default selectUserByEmailModel;
