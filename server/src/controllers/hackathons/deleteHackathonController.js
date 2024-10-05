// Importaciones
import {
    getHackathonByIdModel,
    deleteHackathonModel,
} from '../../models/index.js';

import { generateErrorUtil, removePhotoUtil } from '../../utils/index.js';

//////

const deleteHackathonController = async (req, res, next) => {
    try {
        // Obtenemos el ID del hackathon de los parámetros de la URL.
        const { hackathonId } = req.params;

        // Obtenemos el ID del usuario autenticado desde el token (asumimos que viene en req.user).
        const userId = req.user.id;

        // Obtenemos los detalles del hackathon para verificar que el usuario es el dueño.
        const hackathon = await getHackathonByIdModel(hackathonId);

        // Verificamos si el hackathon existe.
        if (!hackathon) {
            generateErrorUtil('El hackathon no existe', 404);
        }

        // Comprobamos si el usuario autenticado es el organizador del hackathon.
        if (hackathon.organizerId !== userId) {
            generateErrorUtil(
                'No tienes permiso para eliminar este hackathon',
                403,
            );
        }

        // Si el hackathon tiene un logo, eliminamos el archivo del logo del sistema de archivos.
        if (hackathon.logo) {
            await removePhotoUtil(hackathon.logo);
        }

        // Eliminamos el hackathon de la base de datos.
        await deleteHackathonModel(hackathonId);

        // Respuesta.
        res.send({
            status: 'ok',
            message: 'Hackathon eliminado correctamente',
        });
    } catch (err) {
        next(err);
    }
};

export default deleteHackathonController;
