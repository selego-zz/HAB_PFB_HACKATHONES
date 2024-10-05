// Importaciones
import { userSchema } from '../../schemas/index.js';
import { validateSchema, sendMailUtil } from '../../utils/index.js';
import { generateAddOrganizerMailUtil } from '../../utils/index.js';
//////

const addOrganizerController = async (req, res, next) => {
    try {
        await validateSchema(userSchema, req.body);
        const { username, email, password, firstName, lastName } = req.body;

        const emailBody = generateAddOrganizerMailUtil(
            username,
            email,
            password,
            firstName,
            lastName,
        );

        await sendMailUtil(
            process.env.ADMIN_USER_EMAIL,
            `Un nuevo organizador quiere registrarse | ${process.env.APP_NAME}`,
            emailBody,
        );

        res.status(201).send({
            status: 'ok',
            message:
                'El administrador está revisando tu solicitud. En cuanto estés registrado recibirás un correo electrónico de validación.',
        });
    } catch (err) {
        next(err);
    }
};

export default addOrganizerController;
