// Importaciones
import {
    getHackathonByIdModel,
    updateRatingModel,
    getEnrollmentModel,
} from '../../models/index.js';

import { validateSchema, generateErrorUtil } from '../../utils/index.js';
import { rateHackathonSchema } from '../../schemas/index.js';

//////

const updateRatingController = async (req, res, next) => {
    try {
        // Validamos los datos con Joi.
        await validateSchema(rateHackathonSchema, req.body);

        // Obtenemos el id del hackathon que queremos votar.
        const { hackathonId } = req.params;

        // Obtenemos el valor del voto.
        const { rating } = req.body;

        // Obtenemos la entrada del hackathon por su id.
        const hackathon = await getHackathonByIdModel(hackathonId);

        // Comprobamos que el desarrollador esté inscrito en el hackathon que pretende votar.
        const enrollment = await getEnrollmentModel(req.user.id, hackathonId);

        if (!enrollment) {
            generateErrorUtil('No estás inscrito en este hackathon', 403);
        }

        // Comprobamos si la fecha actual es posterior a la fecha de finalización del hackathon.
        const currentDate = new Date();
        const hackathonEndDate = new Date(hackathon.hackathonEnd);

        if (currentDate < hackathonEndDate) {
            generateErrorUtil(
                'No puedes votar hasta que el hackathon haya concluido.',
                403,
            );
        }

        // Actualizamos el voto y obtenemos la media de votos.
        const votesAvg = await updateRatingModel(
            rating,
            hackathonId,
            req.user.id,
        );

        res.send({
            status: 'ok',
            data: {
                votes: votesAvg,
            },
        });
    } catch (err) {
        next(err);
    }
};

export default updateRatingController;
