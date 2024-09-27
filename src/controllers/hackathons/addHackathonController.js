// Importamos los modelos.
import { addHackathonModel } from '../../models/index.js';
import { validateSchema } from '../../utils/index.js';
import { hackathonSchema } from '../../schemas/index.js';

const addHackathonController = async (req, res, next) => {
    try {
        await validateSchema(hackathonSchema, req.body);

        const {
            inscriptionDate,
            inscriptionEnd,
            hackathonDate,
            hackathonEnd,
            maxParticipants,
            prizes,
            logo,
            online,
            location,
            documentation,
        } = req.body;

        await addHackathonModel(
            inscriptionDate,
            inscriptionEnd,
            hackathonDate,
            hackathonEnd,
            maxParticipants,
            prizes,
            logo,
            online,
            location,
            documentation,
        );

        res.status(201).send({
            status: 'ok',
            message: 'Se ha añadido correctamente el hackathon',
        });
    } catch (err) {
        next(err);
    }
};

export default addHackathonController;
