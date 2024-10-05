// Importaciones
import { generateErrorUtil } from '../../utils/index.js';

import {
    deleteHackathonInscriptionModel,
    getHackathonByIdModel,
} from '../../models/index.js';

const MAX_CANCELLATION_HOURS = process.env.MAX_CANCELLATION_HOURS; // Limite de horas para cancelar

//////

// Recibe id de hackatón, id de inscripción y fecha actual
const deleteHackathonInscriptionController = async (req, res, next) => {
    try {
        const { hackathonId } = req.params;
        const usersId = req.user.id;
        // Pilla la inscripción de la base de datos
        const hackathon = await getHackathonByIdModel(hackathonId);

        if (!hackathon) {
            generateErrorUtil('Hackathon no encontrado', 404);
        }

        // Calcula el tiempo transcurrido desde la fecha de inscripción hasta ahora
        const hackathonStart = new Date(hackathon.hackathonDate);
        const now = new Date();
        const hoursRemaining = Math.abs(now - hackathonStart) / 36e5; // Convertir ms a horas

        if (hoursRemaining < MAX_CANCELLATION_HOURS) {
            generateErrorUtil(
                `No se puede cancelar la inscripción. Faltan menos de ${MAX_CANCELLATION_HOURS} horas.`,
                400,
            );
        }

        const result = await deleteHackathonInscriptionModel(
            usersId,
            hackathonId,
        );

        if (!result) {
            generateErrorUtil('No se pudo cancelar la inscripción', 500);
        }

        res.send({
            status: 'ok',
            message: 'Inscripción cancelada con éxito',
        });
    } catch (err) {
        next(err);
    }
};

export default deleteHackathonInscriptionController;
