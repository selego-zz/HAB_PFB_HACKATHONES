import {
    updateScoreModel,
    getHackathonOrganizerModel,
    getEnrollmentModel,
} from '../../models/index.js';

import { validateSchemaUtil, generateErrorUtil } from '../../utils/index.js';

import { userScoreSchema } from '../../schemas/users/index.js';

//////

const updateScoreController = async (req, res, next) => {
    try {
        // Validamos los datos del body.
        await validateSchemaUtil(userScoreSchema, req.body);

        const { score, developerId } = req.body;
        const organizerId = req.user.id;
        const { hackathonId } = req.params;

        // Verificamos que el organizador del hackathon sea el mismo usuario que hace la solicitud.
        const organizerDb = await getHackathonOrganizerModel(hackathonId);

        if (organizerDb !== organizerId) {
            generateErrorUtil(
                'No tienes permiso para puntuar este hackathon',
                403,
            );
        }

        // Verificamos que el desarrollador esté inscrito en el hackathon.
        const enrollment = await getEnrollmentModel(developerId, hackathonId);
        if (!enrollment) {
            generateErrorUtil(
                'El usuario no está inscrito en este hackathon',
                404,
            );
        }

        // Actualizamos la puntuación.
        await updateScoreModel(developerId, hackathonId, score);

        // Enviamos la respuesta.
        res.send({
            status: 'ok',
            message: 'Puntuación actualizada',
        });
    } catch (err) {
        next(err);
    }
};

export default updateScoreController;
