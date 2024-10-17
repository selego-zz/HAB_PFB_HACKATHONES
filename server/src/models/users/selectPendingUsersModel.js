import getPool from '../../db/getPool.js';

//////

// Función que realiza una consulta a la base de datos para seleccionar los usuarios pendientes de validación.
const selectPendingUsersModel = async () => {
    const pool = await getPool();

    const [users] = await pool.query(
        `SELECT id, username, email, avatar, firstName, lastName, role, biography, linkedIn, active, updatedAt, lastAuthUpdate FROM users WHERE active = false`,
    );

    // En caso de que no se haya encontrado a ningún usuario retornará undefined.
    return users;
};

export default selectPendingUsersModel;
