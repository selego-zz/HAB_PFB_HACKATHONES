// Importaciones
import { selectAllUsersModel } from '../../models/index.js';

//////

// Función que retorna todos los usuarios.
const getAllUsersController = async (req, res, next) => {
    try {
        const users = await selectAllUsersModel();

        res.send({
            status: 'ok',
            data: {
                users,
            },
        });
    } catch (err) {
        next(err);
    }
};

export default getAllUsersController;
