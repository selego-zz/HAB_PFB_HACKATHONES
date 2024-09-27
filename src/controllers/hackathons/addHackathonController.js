// Importaciones
import { insertHackathonModel } from '../../models/index.js';

import { savePhotoUtil, validateSchema } from '../../utils/index.js';

import { hackathonSchema } from '../../schemas/index.js';

//////

const addHackathonController = async (req, res, next) => {
    try {
        // Validamos los datos del cuerpo de la solicitud según el esquema del hackathon.
        await validateSchema(hackathonSchema, req.body);

        // Extraemos los datos del cuerpo de la solicitud.
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

        let logoName = null; // Variable para almacenar el nombre del logo

        // Verificamos si hay un archivo de logo subido.
        if (req.files && req.files.logo) {
            const logo = req.files.logo;

            // Guardamos el logo utilizando la utilidad savePhotoUtil
            logoName = await savePhotoUtil(logo, 300);

            // Añadimos el nombre del logo a req.body para guardarlo en la base de datos.
            req.body.logo = logoName;
        }

        // Insertamos el nuevo hackathon en la base de datos.
        await insertHackathonModel(
            inscriptionDate,
            inscriptionEnd,
            hackathonDate,
            hackathonEnd,
            maxParticipants,
            prizes,
            logoName, // Pasamos el nombre del logo si se subió, de lo contrario será null
            online,
            location,
            documentation,
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
