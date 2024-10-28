import crypto from 'crypto';

import {
    generateErrorUtil,
    generateRecoverPassMailUtil,
    sendMailUtil,
} from '../../utils/index.js';

import { selectUserByEmailModel, updateUserModel } from '../../models/index.js';

/////////////////////////////////////////////////////////////////
// Controlador que crea un código de recuperación de contraseña
//       y envía un correo electrónico al usuario para restablecerla
// Recibe un JSON con el correo electrónico cuya contraseña se
//       quiere restablecer
// Envía un correo electrónico al correo indicado
/////////////////////////////////////////////////////////////////

const generateRecoverCodeController = async (req, res, next) => {
    try {
        const { email } = req.body;
        if (!email) generateErrorUtil('Faltan campos', 400);

        // Comprobamos que el usuario existe
        const user = await selectUserByEmailModel(email);
        if (!user || user.length < 1)
            generateErrorUtil('Usuario no encontrado', 404);

        // si ya tiene un código de recuperación, lo enviamos, sino generamos uno nuevo
        if (!user.recoverPassCode) {
            // Generamos un código de recuperación de contraseña.
            const recoverPassCode = await crypto
                .randomBytes(15)
                .toString('hex');

            user.recoverPassCode = recoverPassCode;

            // Lo guardamos en la base de datos
            await updateUserModel({
                id: user.id,
                recoverPassCode: user.recoverPassCode,
            });
        }

        // Generamos un correo electrónico de recuperación
        const mail = generateRecoverPassMailUtil(
            user.username,
            user.recoverPassCode,
        );

        // Enviamos mail
        await sendMailUtil(
            user.email,
            `Recuperación de contraseña en ${process.env.APP_NAME}`,
            mail,
        );

        res.send({
            status: 'ok',
            message: 'Correo de recuperación enviado',
        });
    } catch (err) {
        next(err);
    }
};

export default generateRecoverCodeController;
