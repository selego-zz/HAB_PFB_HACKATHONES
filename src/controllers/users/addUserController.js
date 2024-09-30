// Importamos las dependencias.
import crypto from 'crypto';

// Importamos las utilidades.
import {
    sendMailUtil,
    validateSchema,
    generateErrorUtil,
} from '../../utils/index.js';

// Importamos los modelos.
import {
    selectUserByUsernameModel,
    selectUserByEmailModel,
    addUserModel,
} from '../../models/users/index.js';

//importamos el esquema
import { userSchema } from '../../schemas/index.js';
//////

// Función controladora que permite crear un usuario.
const addUserController = async (req, res, next) => {
    try {
        await validateSchema(userSchema, req.body);

        // Obtenemos los datos necesarios del body.
        const { firstName, lastName, username, email, password, role } =
            req.body;

        if (
            role &&
            role !== 'desarrollador' &&
            req.user?.role !== 'administrador'
        )
            generateErrorUtil(
                'no tienes permisos para realizar esa acción',
                401,
            );

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
        const activationCode = crypto.randomBytes(15).toString('hex');

        // Insertamos el usuario.
        if (
            (await addUserModel(
                firstName,
                lastName,
                username,
                email,
                password,
                activationCode,
                role,
            )) < 1
        )
            generateErrorUtil('Error de inserción en base de datos', 400);

        // Asunto del email de verificación.
        const emailSubject = 'Activa tu usuario en Hackathon';

        // Cuerpo del email de verificación. final
        // const emailBody = `
        //     ¡Hola, ${username}!

        //     Gracias por registrarte en Hackathon. Para activar tu cuenta, haz click en el siguiente enlace:

        //     <a href="${process.env.CLIENT_URL}/users/validate/${activationCode}">¡Activa tu usuario!</a>
        // `;

        //hasta tener el front end, tenemos que usar esta dirección
        const emailBody = `
            ¡Hola, ${username}!

            Gracias por registrarte en Hackathon. Para activar tu cuenta, haz click en el siguiente enlace:

            <a href="http://localhost:${process.env.PORT}/api/users/register/validate/${activationCode}">¡Activa tu usuario!</a>
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

export default addUserController;
