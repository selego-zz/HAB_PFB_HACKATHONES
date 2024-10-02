/* import { addOrganizerModel } from '../../models/index.js'; */
import { userSchema } from '../../schemas/index.js';
import {
    /*   generateErrorUtil, */
    validateSchema,
    sendMailUtil,
} from '../../utils/index.js';

const addOrganizerController = async (req, res, next) => {
    try {
        await validateSchema(userSchema, req.body);
        const { username, email, password, firstName, lastName } = req.body;

        const emailBody = `Hola, estás recibiendo este correo porque un organizador ha tratado de darse de alta en ${process.env.APP_NAME}. Sus datos son: 
        <ul>
        <li> Nombre de usuario: ${username} </li>
        <li> E-mail: ${email} </li>
        <li> Contraseña: ${password} </li>
        <li> Nombre: ${firstName} </li>
        <li> Apellido: ${lastName} </li> 
        </ul>`;

        await sendMailUtil(
            process.env.ADMIN_USER_EMAIL,
            'Un nuevo organizador quiere registrarse',
            emailBody,
        );

        // Crear el organizador
        /* await addOrganizerModel(username, email, password, firstName, lastName); */

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
