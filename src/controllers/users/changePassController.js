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
        const userPass = req.user.password;

        //Comprobamos que la vieja contraseña introducida por el usuario coincide con la que está en la base de datos.
        if (oldPass !== userPass) {
            generateErrorUtil('Contraseña incorrecta', 409);
        }

        // Si las contraseñas no coinciden lanzamos un error.
        if (newPass !== repeatNewPass) {
            generateErrorUtil('Las nuevas contraseñas no coinciden.', 409);
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
