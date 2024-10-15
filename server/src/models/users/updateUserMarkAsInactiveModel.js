// Importaciones
import getPool from '../../db/getPool.js';

import { generateErrorUtil } from '../../utils/index.js';

//////

// Función que inhabilita un usuario.
const updateUserMarkAsInactiveModel = async (userId) => {
    const pool = await getPool();

    // Actualizamos la base de datos.
    const [res] = await pool.query(
        `UPDATE users SET updatedAt = NOW(), lastAuthUpdate = NOW(),
         password = "usuario eliminado",
         username = ?,
         email = ?,
         avatar = "",
         firstName = "Usuario eliminado",
         lastName = "Usuario eliminado",
         biography = "Usuario eliminado",
         linkedIn = "Usuario eliminado",
         active = false
         WHERE id = ?`,
        [crypto.randomUUID(), crypto.randomUUID(), userId],
    );

    return res.affectedRows;
};

export default updateUserMarkAsInactiveModel;
