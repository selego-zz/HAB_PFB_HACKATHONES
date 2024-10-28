import {
    sendMailUtil,
    generateErrorUtil,
    generateConfirmActivationMailUtil,
} from '../../utils/index.js';

import { updateUserModel } from '../../models/users/index.js';

//////

// Función controladora que permite crear un usuario.
const activateOrganizerController = async (req, res, next) => {
    try {
        // Obtenemos los datos necesarios del usuario.
        const { userId } = req.params;
        const { username, email } = req.body;

        const organizer = { id: userId, active: true, activationCode: '' };

        // Activamos el usuario.
        if ((await updateUserModel(organizer)) < 1)
            generateErrorUtil('Error de activación en base de datos', 400);

        // Asunto del email de verificación.
        const emailSubject = `¡Bienvenido a ${process.env.APP_NAME}!`;

        //hasta tener el front end, tenemos que usar esta dirección
        const emailBody = generateConfirmActivationMailUtil(username);

        // Enviamos el email.
        await sendMailUtil(email, emailSubject, emailBody);

        // Enviamos una respuesta al cliente.
        res.status(201).send({
            status: 'ok',
            message: 'Este organizdor ha sido activado.',
        });
    } catch (err) {
        next(err);
    }
};

export default activateOrganizerController;
