// Importaciones
import {
    updateHackathonModel,
    getHackathonByIdModel,
} from '../../models/index.js';

import {
    generateErrorUtil,
    removeFileUtil,
    removePhotoUtil,
    saveFileUtil,
    savePhotoUtil,
    validateSchema,
} from '../../utils/index.js';

import { updateHackathonSchema } from '../../schemas/index.js';

//////

// Función controladora para actualizar los datos de un hackathon.
const updateHackathonController = async (req, res, next) => {
    try {
        if (!Array.isArray(req.body.technologies))
            req.body.technologies = req.body.technologies.split(',');
        if (!Array.isArray(req.body.themes))
            req.body.themes = req.body.themes.split(',');

        // Validamos los datos enviados en el cuerpo de la solicitud.
        await validateSchema(updateHackathonSchema, req.body);

        // Obtenemos los datos del cuerpo de la solicitud y el id del hackathon.
        req.body.id = req.params.hackathonId;

        // Verificamos si el hackathon existe en la base de datos.
        const existingHackathon = await getHackathonByIdModel(req.body.id);
        if (!existingHackathon) {
            generateErrorUtil('No se encontró el hackathon', 404);
        }

        // Verificamos si hay un archivo de logo subido para actualizarlo.
        if (req.files && req.files.logo) {
            const newLogo = req.files.logo;

            // Guardamos el nuevo logo y obtenemos su nombre.
            const newLogoName = await savePhotoUtil(newLogo, 300);

            // Eliminamos el logo anterior si existía.
            if (existingHackathon.logo) {
                await removePhotoUtil(existingHackathon.logo);
            }
            req.body.logo = newLogoName;
        }

        // Verificamos si hay un archivo de documentación adicional.
        if (req.files && req.files.documentation) {
            const documentation = req.files.documentation;

            // Guardamos.
            const documentationFilename = await saveFileUtil(documentation);

            // Borramos la documentación anterior.
            if (existingHackathon.documentation) {
                await removeFileUtil(existingHackathon.documentation);
            }

            // Añadimos el nombre del logo a req.body para guardarlo en la base de datos.
            req.body.documentation = documentationFilename;
        }

        // Actualizamos la base de datos con los nuevos datos del hackathon.
        const updatedRows = await updateHackathonModel(req.body);

        // Verificamos si se realizó alguna actualización.
        if (updatedRows && updatedRows < 1) {
            generateErrorUtil(
                'No se realizaron cambios en los datos del hackathon.',
                400,
            );
        }

        // Respuesta.
        res.send({
            status: 'ok',
            message: 'Datos del hackathon actualizados con éxito.',
        });
    } catch (err) {
        next(err);
    }
};

export default updateHackathonController;
