// Importamos la función que retorna una conexión con la base de datos.
import getPool from '../../db/getPool.js';

// Importamos las utilidades.
import sendMailUtil from '../../utils/sendMailUtil.js';
import generateErrorUtil from '../../utils/generateErrorUtil.js';

// Importamos los modelos.
import selectUserByUsernameModel from '../../models/selectUserByUsernameModel.js';
import selectUserByEmailModel from '../../models/selectUserByEmailModel.js';

//////

// Función controladora que permite crear un usuario.
const newUserController = async (req, res, next) => {
    try {
        // Obtenemos los datos necesarios del body.
        const { firstName, lastName, username, email, password } = req.body;

        // Si falta algún campo lanzamos un error.
        if (!firstName || !lastName || !username || !email || !password) {
            generateErrorUtil('Falta uno o varios campos obligatorios', 400);
        }

        // Comprobamos si existe usuario con ese nombre de usuario y lanzamos un error si lo hay.
        const usernameUserExists = await selectUserByUsernameModel(username);
        if (usernameUserExists) {
            generateErrorUtil('Nombre de usuario no disponible', 409);
        }

        // Comprobamos si existe usuario con ese email y lanzamos un error si lo hay.
        const emailUserExists = await selectUserByEmailModel(email);
        if (emailUserExists) {
            generateErrorUtil('Email no disponible', 409);
        }

        // Insertamos el usuario.
        await pool.query(
            `INSERT INTO users(username, email, password, registrationCode) VALUES(?, ?, ?, ?)`,
            [username, email, hashedPass, registrationCode],
        );

        // Asunto del email de verificación.
        const emailSubject = 'Activa tu usuario en Diario de Viajes :)';

        // Cuerpo del email de verificación.
        const emailBody = `
            ¡Hola, ${username}!

            Gracias por registrarte en Hackathon. Para activar tu cuenta, haz click en el siguiente enlace:

            <a href="${process.env.CLIENT_URL}/users/validate/${registrationCode}">¡Activa tu usuario!</a>
        `;

        // Enviamos el email.
        await sendMailUtil(email, emailSubject, emailBody);

        // Enviamos una respuesta al cliente.
        res.status(201).send({
            status: 'ok',
            message:
                'Usuario registrado. En breve recibirás un enlace de verificación en tu correo electrónico.',
        });
    } catch (err) {
        next(err);
    }
};

export default newUserController;
