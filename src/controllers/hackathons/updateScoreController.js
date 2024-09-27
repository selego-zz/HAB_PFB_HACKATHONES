import {
    updateScoreModel,
    getHackathonOrganizerModel,
    getEnrollmentModel,
} from '../../models/hackathons/index.js';

import { validateSchema, generateErrorUtil } from '../../utils/index.js';

import { userScoreSchema } from '../../schemas/index.js';

//////

const updateScoreController = async (req, res, next) => {
    try {
        // Validamos los datos del body.
        await validateSchema(userScoreSchema, req.body);
        const { userId, hackathonId, score } = req.body;

        // Verificamos que el organizador del hackathon sea el mismo usuario que hace la solicitud.
        const organizer = await getHackathonOrganizerModel(hackathonId);
        if (organizer.id !== req.user.id) {
            generateErrorUtil(
                'No tienes permiso para puntuar este hackathon',
                403,
            );
        }

        // Verificamos que el desarrollador esté inscrito en el hackathon.
        const enrollment = await getEnrollmentModel(userId, hackathonId);
        if (!enrollment) {
            generateErrorUtil(
                'El usuario no está inscrito en este hackathon',
                404,
            );
        }

        // Actualizamos la puntuación.
        await updateScoreModel(userId, hackathonId, score);

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