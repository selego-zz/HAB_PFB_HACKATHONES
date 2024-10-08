// Importaciones
import getPool from '../../db/getPool.js';

import { generateErrorUtil } from '../../utils/index.js';
import bcrypt from 'bcrypt';

//////

// Función que realiza una consulta a la base de datos para activar un usuario.
const updatePassModel = async (userId, oldPass, newPass) => {
    const pool = await getPool();

    // Comptobamos la vieja password
    const [pass] = await pool.query(`SELECT password FROM users WHERE id = ?`, [
        userId,
    ]);

    if (
        pass.length === 0 ||
        (await bcrypt.compare(oldPass, pass[0].password)) === false
    ) {
        generateErrorUtil('Credenciales inválidas', 401);
    }

    // Encriptamos la nueva contraseña y la antigua.
    const hashedNewPass = await bcrypt.hash(newPass, 10);

    // Actualizamos la base de datos.
    const [res] = await pool.query(
        `UPDATE users SET updatedAt = NOW(), lastAuthUpdate = NOW(), password = ? WHERE id = ?`,
        [hashedNewPass, userId],
    );

    // Comprobamos el número de filas afectadas por la actualización. Si es 0, significa que no se ha encontrado el usuario y por tanto no existe.
    if (res.affectedRows === 0) {
        generateErrorUtil(
            'O el usuario no existe o la contraseña es incorrecta',
            400,
        );
    }
    return res.affectedRows;
};

export default updatePassModel;
