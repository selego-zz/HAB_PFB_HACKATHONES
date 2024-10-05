// Importaciones
import { selectAllUsersModel } from '../../models/index.js';

//////

// Función controladora final que retorna los datos del usuario del token.
const getAllUsersController = async (req, res, next) => {
    try {
        const user = await selectAllUsersModel();

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

export default getAllUsersController;
