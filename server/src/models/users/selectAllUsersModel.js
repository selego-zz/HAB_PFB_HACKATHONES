import getPool from '../../db/getPool.js';
import { selectUserTechnologiesModel } from './index.js';

//////

// Función que realiza una consulta a la base de datos para seleccionar todos los usuarios registrados.
const selectAllUsersModel = async () => {
    const pool = await getPool();

    const [users] = await pool.query(
        `SELECT id, username, email, avatar, firstName, lastName, role, biography, linkedIn, active, updatedAt, lastAuthUpdate FROM users WHERE password <> "usuario eliminado"`,
    );

    //buscamos las tecnologías de cada usuario y las metemos en technologies
    return users.map((user) => {
        user.technologies = selectUserTechnologiesModel(user.id);
        return user;
    });
};

export default selectAllUsersModel;
