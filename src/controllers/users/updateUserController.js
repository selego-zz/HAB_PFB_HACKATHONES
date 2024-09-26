// Importamos dependencias.
import fileUpload from 'express-fileupload';

// Importamos los modelos.
import { updateUserModel } from '../../models/users/index.js';

//////

// Función controladora que le permite a un usuario cambiar sus datos personales.
const updateUserController = async (req, res, next) => {
    try {
        // Obtenemos los datos necesarios.
        const { username, email, firstName, lastName } = req.body;
        const userId = req.user.id;
        req.body.id = req.user.id;

        req.body.avatar = await fileUpload();

        // Actualizamos la base de datos.
        await updateUserModel(req.body);

        // Enviamos una respuesta al cliente.
        res.send({
            status: 'ok',
            message: 'Datos actualizados con éxito.',
        });
    } catch (err) {
        next(err);
    }
};

export default updateUserController;
