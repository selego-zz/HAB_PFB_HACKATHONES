// Importaciones
import getPool from '../../db/getPool.js';

import { generateErrorUtil } from '../../utils/index.js';

//////

// Función que inhabilita un usuario.
const updateUserMarkAsInactive = async (userId) => {
    const pool = await getPool();

    // Actualizamos la base de datos.
    const [res] = await pool.query(
        `UPDATE users SET updatedAt = NOW(), lastAuthUpdate = NOW(),
         password = "oqwuhe3kqw",
         username = "Usuario eliminado",
         email = "Usuario eliminado",
         avatar = "",
         firstname = "Usuario eliminado",
         lastname = "Usuario eliminado",
         biography = "Usuario eliminado",
         linkedin = "Usuario eliminado",
         active = false
         WHERE id = ?`,
        [userId],
    );

    return res.affectedRows;
};

export default updateUserMarkAsInactive;
