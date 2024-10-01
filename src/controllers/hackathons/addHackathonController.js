// Importaciones
import { addHackathonModel } from '../../models/index.js';

import {
    saveFileUtil,
    savePhotoUtil,
    validateSchema,
} from '../../utils/index.js';

import { hackathonSchema } from '../../schemas/index.js';

//////

const addHackathonController = async (req, res, next) => {
    try {
        // Validamos los datos del cuerpo de la solicitud según el esquema del hackathon.
        await validateSchema(hackathonSchema, req.body);

        const organizerId = req.user.id;

        // Extraemos los datos del cuerpo de la solicitud.
        const {
            name,
            inscriptionDate,
            inscriptionEnd,
            hackathonDate,
            hackathonEnd,
            maxParticipants,
            prizes,
            online,
            location,
        } = req.body;

        let logoName = null; // Variable para almacenar el nombre del logo
        let documentationFilename = null; // Variable para almacenar el nombre de la documentación

        // Verificamos si hay un archivo de logo subido.
        if (req.files && req.files.logo) {
            const logo = req.files.logo;

            // Guardamos el logo utilizando la utilidad savePhotoUtil
            logoName = await savePhotoUtil(logo, 300);

            // Añadimos el nombre del logo a req.body para guardarlo en la base de datos.
            req.body.logo = logoName;
        }
        // Verificamos si hay un archivo de documentación adicional.
        if (req.files && req.files.documentation) {
            const documentation = req.files.documentation;

            // Guardamos el archivo en uploads
            documentationFilename = saveFileUtil(documentation);
        }

        // Insertamos el nuevo hackathon en la base de datos.
        await addHackathonModel(
            name,
            organizerId,
            inscriptionDate,
            inscriptionEnd,
            hackathonDate,
            hackathonEnd,
            maxParticipants,
            prizes,
            logoName, // Pasamos el nombre del logo si se subió, de lo contrario será null
            online,
            location,
            documentationFilename, // Pasamos el nombre del fichero de documentación si se subió, de lo contrario será null
        );

        // Respondemos al cliente con un estado 201 (creado) y un mensaje de éxito.
        res.status(201).send({
            status: 'ok',
            message: 'Se ha añadido correctamente el hackathon',
        });
    } catch (err) {
        // Si ocurre algún error, lo pasamos al middleware de manejo de errores.
        next(err);
    }
};

export default addHackathonController;
