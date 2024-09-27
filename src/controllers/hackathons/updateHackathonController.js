// Importaciones
import {
    updateHackathonModel,
    getHackathonByIdModel,
} from '../../models/index.js';

import {
    savePhotoUtil,
    removePhotoUtil,
    generateErrorUtil,
    validateSchema,
} from '../../utils/index.js';

import { hackathonSchema } from '../../schemas/index.js';

//////

// Función controladora para actualizar los datos de un hackathon.
const updateHackathonController = async (req, res, next) => {
    try {
        // Validamos los datos enviados en el cuerpo de la solicitud.
        await validateSchema(hackathonSchema, req.body);

        // Obtenemos los datos del cuerpo de la solicitud y el id del hackathon.
        const {
            inscriptionDate,
            inscriptionEnd,
            hackathonDate,
            hackathonEnd,
            maxParticipants,
            prizes,
            online,
            location,
            documentation,
        } = req.body;
        const hackathonId = req.params.id;

        // Verificamos si el hackathon existe en la base de datos.
        const existingHackathon = await getHackathonByIdModel(hackathonId);
        if (!existingHackathon) {
            throw generateErrorUtil('No se encontró el hackathon', 404);
        }

        // Variable para guardar el nuevo nombre del logo si se actualiza.
        let newLogoName = existingHackathon.logo;

        // Verificamos si hay un archivo de logo subido para actualizarlo.
        if (req.files && req.files.logo) {
            const newLogo = req.files.logo;

            // Guardamos el nuevo logo y obtenemos su nombre.
            newLogoName = await savePhotoUtil(newLogo, 300);

            // Eliminamos el logo anterior si existía.
            if (existingHackathon.logo) {
                await removePhotoUtil(existingHackathon.logo);
            }
        }

        // Actualizamos la base de datos con los nuevos datos del hackathon.
        const updatedRows = await updateHackathonModel({
            id: hackathonId,
            inscriptionDate,
            inscriptionEnd,
            hackathonDate,
            hackathonEnd,
            maxParticipants,
            prizes,
            logo: newLogoName, // Pasamos el nuevo logo si fue actualizado
            online,
            location,
            documentation,
        });

        // Verificamos si se realizó alguna actualización.
        if (updatedRows === 0) {
            throw generateErrorUtil(
                'No se realizaron cambios en los datos del hackathon.',
                400,
            );
        }

        // Respondemos al cliente.
        res.send({
            status: 'ok',
            message: 'Datos del hackathon actualizados con éxito.',
        });
    } catch (err) {
        next(err);
    }
};

export default updateHackathonController;
