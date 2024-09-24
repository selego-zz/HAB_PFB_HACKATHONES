// Importamos la función que devuelve una conexión con la base de datos.
import getPool from '../../db/getPool.js';

// Importamos los errores.
import generateErrorUtil from '../utils/generateErrorUtil.js';

//////

// Función que realiza una consulta a la base de datos para activar un usuario.
const updateActiveUserModel = async (registrationCode) => {
    const pool = await getPool();

    // Buscamos a un usuario con el código de registro proporcionado.
    const [users] = await pool.query(
        `SELECT id FROM users WHERE registrationCode = ?`,
        [registrationCode],
    );

    // Si no existe lanzamos un error.
    if (users.length < 1) {
        generateErrorUtil('El usuario no existe', 404);
    }

    // Activamos al usuario.
    await pool.query(
        `UPDATE users SET active = true, registrationCode = null WHERE registrationCode = ?`,
        [registrationCode],
    );
};

export default updateActiveUserModel;
