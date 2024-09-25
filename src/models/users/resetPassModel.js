// Importamos la función que devuelve una conexión con la base de datos.
import getPool from '../../db/getPool.js';

/////////////////////////////////////////////////////////////////
// Modelo que actualiza la contraseña en la base de datos
//       usa como condición para el UPDATE el recoverPassCode
//       para asegurarse de que sea correctoaseña repetida
// Recibe por recoverPassCode, y la nueva contraseña
/////////////////////////////////////////////////////////////////

const resetPassModel = async (recoverPassCode, newPass) => {
    const pool = await getPool();

    // Activamos al usuario.
    const [res] = await pool.query(
        `UPDATE users SET password = ? WHERE recoverPassCode = ?`,
        [newPass, recoverPassCode],
    );

    return res.affectedRows;
};

export default resetPassModel;
