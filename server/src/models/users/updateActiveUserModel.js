// Importamos la función que devuelve una conexión con la base de datos.
import getPool from '../../db/getPool.js';

// Importamos los errores.
import generateErrorUtil from '../../utils/generateErrorUtil.js';

//////

// Función que realiza una consulta a la base de datos para activar un usuario.
const updateActiveUserModel = async (activationCode) => {
    const pool = await getPool();

    // Activamos al usuario.
    const [res] = await pool.query(
        `UPDATE users SET active = true, activationCode = null, updatedAt = NOW(), lastAuthUpdate = NOW() WHERE activationCode = ?`,
        [activationCode],
    );

    // Comprobamos el número de filas afectadas por la actualización. Si es 0, significa que no se ha encontrado el usuario y por tanto no existe.
    if (res.affectedRows === 0) {
        generateErrorUtil('El usuario no existe', 404);
    }
    return res.affectedRows;
};

export default updateActiveUserModel;
