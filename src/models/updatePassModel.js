// Importamos la función que devuelve una conexión con la base de datos.
import getPool from '../../db/getPool.js';

// Importamos los errores.
import generateErrorUtil from '../utils/generateErrorUtil.js';

//////

// Función que realiza una consulta a la base de datos para activar un usuario.
const updatePassModel = async (userId, oldPass, newPass) => {
    const pool = await getPool();

    // Activamos al usuario.
    const [res] = await pool.query(
        `UPDATE users SET password = ? WHERE id = ? AND password = ?`,
        [newPass, userId, oldPass],
    );

    // Comprobamos el número de filas afectadas por la actualización. Si es 0, significa que no se ha encontrado el usuario y por tanto no existe.
    if (res.affectedRows === 0) {
        generateErrorUtil(
            'O el usuario no existe o la contraseña es incorrecta',
            400,
        );
    }
};

export default updatePassModel;
