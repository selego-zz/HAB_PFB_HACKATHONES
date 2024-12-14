// Importaciones
import crypto from 'crypto';

import {
    sendMailUtil,
    validateSchemaUtil,
    generateErrorUtil,
    generateAddUserMailUtil,
} from '../../utils/index.js';

import { userSchema } from '../../schemas/users/index.js';

import {
    selectUserByUsernameModel,
    selectUserByEmailModel,
    addUserModel,
} from '../../models/users/index.js';

//////

// Función controladora que permite crear un usuario.
const addUserController = async (req, res, next) => {
    try {
        await validateSchemaUtil(userSchema, req.body);

        // Obtenemos los datos necesarios del body.
        const { firstName, lastName, username, email, password, role } =
            req.body;

        if (
            role &&
            role !== 'desarrollador' &&
            role !== 'organizador' &&
            req.user?.role !== 'administrador'
        )
            generateErrorUtil(
                'No tienes permisos para realizar esa acción',
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
        const emailSubject = `Activa tu usuario en ${process.env.APP_NAME}!`;

        //hasta tener el front end, tenemos que usar esta dirección
        const emailBody = generateAddUserMailUtil(username, activationCode);

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
