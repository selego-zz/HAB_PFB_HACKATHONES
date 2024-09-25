// Importamos las dependencias.
import crypto from 'crypto';

// Importamos las utilidades.
import sendMailUtil from '../../utils/sendMailUtil.js';
import generateErrorUtil from '../../utils/generateErrorUtil.js';

// Importamos los modelos.
import selectUserByUsernameModel from '../../models/users/index.js';
import selectUserByEmailModel from '../../models/users/index.js';
import insertUserModel from '../../models/users/index.js';

//////

// Función controladora que permite crear un usuario.
const newUserController = async (req, res, next) => {
    try {
        // Obtenemos los datos necesarios del body.
        const { firstName, lastName, username, email, password } = req.body;

        // Comprobamos si existe usuario con ese nombre de usuario y lanzamos un error si lo hay.
        const usernameUserExists = await selectUserByUsernameModel(username);

        if (usernameUserExists) {
            generateErrorUtil('Nombre de usuario no disponible.', 409);
        }

        // Comprobamos si existe usuario con ese email y lanzamos un error si lo hay.
        const emailUserExists = await selectUserByEmailModel(email);

        if (emailUserExists) {
            generateErrorUtil('Email no disponible.', 409);
        }

        // Una vez completaedas las comprobaciones, procedemos a generar un código de registro.
        const registrationCode = crypto.randomBytes(15).toString('hex');

        // Insertamos el usuario.
        await insertUserModel(
            firstName,
            lastName,
            username,
            email,
            password,
            registrationCode,
        );

        // Asunto del email de verificación.
        const emailSubject = 'Activa tu usuario en Hackathon';

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
