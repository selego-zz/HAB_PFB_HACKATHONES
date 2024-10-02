import bcrypt from 'bcrypt';

// Importamos la función que devuelve una conexión con la base de datos.
import getPool from '../../db/getPool.js';

// Función que realiza una consulta a la base de datos para insertar un nuevo organizador.
const addOrganizerModel = async (
    firstName,
    lastName,
    username,
    email,
    password,
) => {
    const pool = await getPool();

    // Encriptamos la contraseña.
    const hashedPass = await bcrypt.hash(password, 10);

    // Insertamos el organizador.
    const SQL_INSERT_ORGANIZER = `
        INSERT INTO users (firstName, lastName, username, email, password, role, active) 
        VALUES (?, ?, ?, ?, ?, 'organizador', true)
    `;

    const [res] = await pool.query(SQL_INSERT_ORGANIZER, [
        firstName,
        lastName,
        username,
        email,
        hashedPass,
    ]);
    return res.insertId;
};

export default addOrganizerModel;
