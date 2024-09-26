// Importamos la función que genera un error.
import generateErrorUtil from '../../utils/generateErrorUtil.js';

// Importamos los modelos.
import { updatePassModel } from '../../models/users/index.js';

//////

// Función controladora que le permite a un usuario cambiar su contraseña.
const changePassController = async (req, res, next) => {
    try {
        // Obtenemos los datos necesarios.
        const { oldPass, newPass, repeatNewPass } = req.body;

        const userId = req.user.id;

        // Si las contraseñas no coinciden lanzamos un error.
        if (newPass !== repeatNewPass) {
            generateErrorUtil('Las nuevas contraseñas no coinciden.', 409);
        }

        // Actualizamos la base de datos, comprobando que la vieja contraseña introducida por el usuario coincide con la ya existente.
        await updatePassModel(userId, oldPass, newPass);

        // Enviamos una respuesta al cliente.
        res.send({
            status: 'ok',
            message: 'Contraseña actualizada con éxito.',
        });
    } catch (err) {
        next(err);
    }
};

export default changePassController;
