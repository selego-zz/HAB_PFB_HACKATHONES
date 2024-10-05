// Importamos los modelos.
import { updateActiveUserModel } from '../../models/index.js';

//////

// Función controladora que valida a un usuario recién registrado.
const validateUserController = async (req, res, next) => {
    try {
        // Obtenemos el código de registro.
        const { activationCode } = req.params;

        // Activamos el usuario.
        await updateActiveUserModel(activationCode);

        res.send({
            status: 'ok',
            message: 'Usuario activado',
        });
    } catch (err) {
        next(err);
    }
};

export default validateUserController;
