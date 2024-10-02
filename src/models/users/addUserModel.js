// Importamos las dependencias.
import bcrypt from 'bcrypt';

// Importamos la función que devuelve una conexión con la base de datos.
import getPool from '../../db/getPool.js';

//////

// Función que realiza una consulta a la base de datos para insertar un nuevo usuario.
const addUserModel = async (
    firstName,
    lastName,
    username,
    email,
    password,
    activationCode,
    role,
) => {
    const pool = await getPool();

    // Encriptamos la contraseña.
    const hashedPass = await bcrypt.hash(password, 10);

    if (!role) role = 'desarrollador';

    // Insertamos el usuario.
    const [res] = await pool.query(
        `INSERT INTO users(firstName, lastName, username, email, password, activationCode, role) VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [
            firstName,
            lastName,
            username,
            email,
            hashedPass,
            activationCode,
            role,
        ],
    );
    return res.insertId;
};

export default addUserModel;
