import { generateErrorUtil, validateSchema } from '../../utils/index.js';
import { addHackathonInscriptionModel } from '../../models/hackathons/index.js';
import { enrollsInSchema } from '../../schemas/index.js';

//////

// recibe id de hackaton, id de usuario y fecha y devuelve id de inscripcion
const addHackathonInscriptionController = async (req, res, next) => {
    try {
        await validateSchema(enrollsInSchema, req.body);

        const { hackathonId } = req.params;
        const { userId } = req.body;
        const { date } = req.body;

        const inscription = await addHackathonInscriptionModel(
            hackathonId,
            userId,
            date,
        );

        if (!inscription) {
            throw generateErrorUtil('No se pudo crear la inscripción', 500);
        }

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
