// Importamos los modelos.
import selectUserByIdModel from '../../models/users/selectUserByIdModel.js';

// Importamos los errores.
import generateErrorUtil from '../utils/generateErrorUtil.js';

//////

// Función controladora final que retorna los datos del usuario del token.
const getOwnUserController = async (req, res, next) => {
    try {
        const userId = req.user.id;

        // Comprobamos la base de datos con el id proporcionado.
        const user = await selectUserByIdModel(userId);

        // Si no existe ningún usuario con ese id lanzamos un error.
        if (!user) {
            generateErrorUtil('El usuario no existe.', 404);
        }

        res.send({
            status: 'ok',
            data: {
                user,
            },
        });
    } catch (err) {
        next(err);
    }
};

export default getOwnUserController;
