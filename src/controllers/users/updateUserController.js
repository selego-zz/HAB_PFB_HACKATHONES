// Importamos dependencias.
import path from 'path';
import sharp from 'sharp';
import { updateUserModel } from '../../models/users/index.js';
import generateErrorUtil from '../../utils/generateErrorUtil.js';

//////

// Función controladora que le permite a un usuario cambiar sus datos personales.
const updateUserController = async (req, res, next) => {
    try {
        // Obtenemos los datos necesarios.
        // eslint-disable-next-line no-unused-vars
        const { username, email, firstName, lastName } = req.body;
        const userId = req.user.id;

        // Verificamos si hay un archivo de avatar subido.
        if (req.files && req.files.avatar) {
            const avatar = req.files.avatar;

            // Definimos el directorio donde se almacenará el archivo redimensionado.
            const avatarFileName = `${userId}_${Date.now()}_${avatar.name}`;
            const avatarPath = path.join('uploads/avatars', avatarFileName);

            try {
                // Usamos sharp para redimensionar la imagen a un tamaño específico (ejemplo: 300x300)
                await sharp(avatar.data)
                    .resize(300, 300) // Modificamos dimensiones.
                    .toFormat('jpeg') // Convertimos la imagen a jpeg.
                    .jpeg({ quality: 90 }) // Calidad de la imagen.
                    .toFile(avatarPath); // Guardamos la imagen.

                // Añadimos el path del avatar a req.body para actualizarlo en la base de datos.
                req.body.avatar = avatarPath;
            } catch (err) {
                next(err);
            }
        }

        // Añadimos el id del usuario en el cuerpo de la solicitud.
        req.body.id = userId;

        // Actualizamos la base de datos.
        const updatedRows = await updateUserModel(req.body);

        // Si no se encuentra el usuario o no se realizaron cambios.
        if (updatedRows === 0) {
            generateErrorUtil(
                'No se encontró el usuario o no se realizaron cambios.',
                400,
            );
        }

        // Enviamos una respuesta al cliente.
        res.send({
            status: 'ok',
            message: 'Datos actualizados con éxito.',
        });
    } catch (err) {
        next(err);
    }
};

export default updateUserController;
