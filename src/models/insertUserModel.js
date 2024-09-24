// Importamos las dependencias.
import bcrypt from 'bcrypt';
import crypto from 'crypto';

// Importamos la función que devuelve una conexión con la base de datos.
import getPool from '../../db/getPool.js';

//////

// Función que realiza una consulta a la base de datos para insertar un nuevo usuario.
const insertUserModel = async (
    firstName,
    lastName,
    username,
    email,
    password,
) => {
    const pool = await getPool();

    // Creamos un código de registro.
    const registrationCode = crypto.randomBytes(15).toString('hex');

    // Encriptamos la contraseña.
    const hashedPass = await bcrypt.hash(password, 10);

    // Insertamos el usuario.
    await pool.query(
        `INSERT INTO users(firstName, lastName, username, email, password, registrationCode) VALUES (?, ?, ?, ?, ?, ?)`,
        [firstName, lastName, username, email, hashedPass, registrationCode],
    );
};

export default insertUserModel;
