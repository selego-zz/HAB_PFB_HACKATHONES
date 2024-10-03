// Importaciones
import { generateErrorUtil } from '../../utils/index.js';

import {
    getEnrollmentModel,
    addHackathonInscriptionModel,
    getHackathonByIdModel,
} from '../../models/index.js';

//////

// Recibe id de hackaton, id de usuario y fecha y devuelve id de inscripcion.
const addHackathonInscriptionController = async (req, res, next) => {
    try {
        // No hay que validar datos porque nada va por body. //

        const { hackathonId } = req.params;
        const userId = req.user.id;

        // Comprobaciones de existencia en la BD.
        const hackathon = await getHackathonByIdModel(hackathonId);
        if (!hackathon) {
            generateErrorUtil('Hackathon no encontrado', 404);
        }

        const alreadyRegistered = await getEnrollmentModel(userId, hackathonId);
        if (alreadyRegistered) {
            generateErrorUtil('Ya estás inscrito en ese hackathon', 409);
        }

        const inscription = await addHackathonInscriptionModel(
            hackathonId,
            userId,
        );
        if (!inscription) {
            generateErrorUtil('No se pudo crear la inscripción', 500);
        }

        // Respuesta.
        res.status(201).send({
            status: 'ok',
            message: 'Inscripción realizada con éxito',
            data: inscription,
        });
    } catch (err) {
        next(err);
    }
};

export default addHackathonInscriptionController;
