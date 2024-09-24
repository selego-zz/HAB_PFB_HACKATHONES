// Importamos la función que genera un error.
import generateErrorUtil from '../../utils/generateErrorUtil.js';

// Importamos los modelos.
import updateUserModel from '../../models/updateUserModel.js';

//////

// Función controladora que le permite a un usuario cambiar su contraseña.
const changePassController = async (req, res, next) => {
    try {
        // Obtenemos los datos necesarios.
        const { oldPass, newPass, repeatNewPass } = req.body;

        const userId = req.user.id;

        // Si faltan campos lanzamos un error.
        if (!oldPass || !newPass || !repeatNewPass) {
            generateErrorUtil('Faltan campos', 400);
        }

        // Si las contraseñas no coinciden lanzamos un error.
        if (newPass !== repeatNewPass) {
            generateErrorUtil('Las contraseñas no coinciden.', 409);
        }

        await updateUserModel(newPass, userId);

        // Enviamos una respuesta al cliente.
        res.send({
            status: 'ok',
            message: 'Contraseña actualizada exitosamente',
        });
    } catch (err) {
        next(err);
    }
};

export default changePassController;
