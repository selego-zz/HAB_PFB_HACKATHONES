import {
    selectUserByIdModel,
    updateUserMarkAsInactive,
} from '../../models/index.js';
import { generateErrorUtil } from '../../utils';

const deleteUser = async (req, res) => {
    const { userId } = req.params;
    try {
        const user = await selectUserByIdModel(userId);
        if (!user) {
            generateErrorUtil('Usuario no encontrado', 404);
        }

        updateUserMarkAsInactive(userId);
        res.send({
            status: 'ok',
            message: 'Usuario desactivado correctamente',
        });
    } catch (error) {
        generateErrorUtil('Error al desactivar el usuario', 500);
    }
};
