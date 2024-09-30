// Importamos la función que devuelve una conexión con la base de datos.
import getPool from '../../db/getPool.js';
import bcrypt from 'bcrypt';

/////////////////////////////////////////////////////////////////
// Modelo que actualiza la contraseña en la base de datos
//       usa como condición para el UPDATE el recoverPassCode
//       para asegurarse de que sea correctoaseña repetida
// Recibe por recoverPassCode, y la nueva contraseña
/////////////////////////////////////////////////////////////////

const updateResetPassModel = async (recoverPassCode, newPass) => {
    const pool = await getPool();

    // Activamos al usuario.
    const [res] = await pool.query(
        `UPDATE users SET password = ? WHERE recoverPassCode = ?`,
        [await bcrypt.hash(newPass, 10), recoverPassCode],
    );

    return res.affectedRows;
};

export default updateResetPassModel;
