import {
    selectUserByIdModel,
    updateUserMarkAsInactiveModel,
} from '../../models/index.js';
import { generateErrorUtil } from '../../utils/index.js';

const deleteUserController = async (req, res) => {
    const { userId } = req.params;
    try {
        const user = await selectUserByIdModel(userId);
        if (!user) {
            generateErrorUtil('Usuario no encontrado', 404);
        }

        updateUserMarkAsInactiveModel(userId);

        res.send({
            status: 'ok',
            message: 'Usuario desactivado correctamente',
        });
    } catch (error) {
        generateErrorUtil('Error al desactivar el usuario', 500);
    }
};

export default deleteUserController;
