// Importaciones
import {
    selectAllUsersModel,
    selectPendingUsersModel,
} from '../../models/index.js';

//////

// Función que retorna todos los usuarios.
const getAllUsersController = async (req, res, next) => {
    try {
        const queryType = req.query;

        let users;

        switch (queryType.type) {
            case 'pending':
                users = await selectPendingUsersModel();
                break;
            case 'all':
            default:
                users = await selectAllUsersModel();
                break;
        }

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
