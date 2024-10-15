// Importaciones
import { selectUserByIdModel, updateUserModel } from '../../models/index.js';

import {
    savePhotoUtil,
    removePhotoUtil,
    generateErrorUtil,
    validateSchema,
} from '../../utils/index.js';

import { updateUserSchema } from '../../schemas/index.js';

//////

// Función controladora que le permite a un usuario cambiar sus datos personales.
const updateUserController = async (req, res, next) => {
    try {
        // Validamos el esquema de los datos que se están actualizando
        await validateSchema(updateUserSchema, req.body);

        if (Object.keys(req.body).length === 0 && !req.files)
            generateErrorUtil('No hay campos que actualizar', 400);

        const userId = req.user.id;

        // Variable para guardar el nombre del avatar actual (si es reemplazado)
        let previousAvatar = null;

        // Verificamos si hay un archivo de avatar subido.
        if (req.files && req.files.avatar) {
            const avatar = req.files.avatar;

            // Antes de guardar la nueva imagen, guardamos el nombre del avatar anterior para eliminarlo después
            const user = await selectUserByIdModel(userId);

            if (user && user.avatar) {
                previousAvatar = user.avatar;
            }

            // Guardamos el nuevo avatar
            const avatarName = await savePhotoUtil(avatar, 300);

            // Añadimos el nuevo nombre de avatar a req.body para actualizar la base de datos
            req.body.avatar = avatarName;

            // Si el usuario tenía un avatar anterior y fue reemplazado, eliminamos el archivo anterior.
            if (previousAvatar) {
                await removePhotoUtil(previousAvatar);
            }
        }

        // Añadimos el id del usuario al cuerpo de la solicitud para identificar qué usuario se está actualizando.
        req.body.id = userId;

        // Actualizamos la base de datos con los nuevos datos.
        const updatedRows = await updateUserModel(req.body);

        // Si no se encuentra el usuario o no se realizaron cambios.
        if (updatedRows === 0) {
            generateErrorUtil(
                'No se encontró el usuario o no se realizaron cambios.',
                400,
            );
        }
        // Comprobamos la base de datos con el id proporcionado.
        const user = await selectUserByIdModel(userId);

        // Enviamos una respuesta al cliente.
        res.send({
            status: 'ok',
            message: 'Datos actualizados con éxito.',
            data: {
                user,
            },
        });
    } catch (err) {
        next(err);
    }
};

export default updateUserController;
