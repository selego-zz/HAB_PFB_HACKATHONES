// Importamos los modelos.
import getHackathonByIdModel from '../../models/hackathons/getHackathonByIdModel.js';
import insertRatingModel from '../../models/entries/insertRatingModel.js';

// Importamos la función que valida esquemas y el esquema de Joi.
import validateSchema from '../../utils/validateSchema.js';
import rateHackathonSchema from '../../schemas/hackathons/rateHackathonSchema.js'; // FALTA

// Importamos los errores.
import generateErrorUtil from '../../utils/generateErrorUtil.js';

//////

const rateHackathonController = async (req, res, next) => {
    try {
        // Validamos los datos con Joi.
        await validateSchema(rateHackathonSchema, req.body);

        // Obtenemos el id del hackathon que queremos votar.
        const { hackathonId } = req.params;

        // Obtenemos el valor del voto.
        const { value } = req.body;

        // Obtenemos la entrada del hackathon por su id.
        const hackathon = await getHackathonByIdModel(hackathonId);

        // Si somos los dueños de la entrada lanzamos un error.
        if (hackathon.userId === req.user.id) {
            throw generateErrorUtil(
                'No puedes votar tu propio hackathon.',
                403,
            );
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

        // Insertamos el voto y obtenemos la media de votos.
        const votesAvg = await insertRatingModel(
            value,
            hackathonId,
            req.user.id,
        );

        res.status(201).send({
            status: 'ok',
            data: {
                entry: {
                    votes: votesAvg,
                },
            },
        });
    } catch (err) {
        next(err);
    }
};

export default rateHackathonController;
