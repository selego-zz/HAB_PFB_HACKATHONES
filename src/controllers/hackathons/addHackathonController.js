// Importamos los modelos.
import insertHackathonModel from '../../models/hackathons/insertHackathonModel.js';
import validateSchema from '../../utils/validateSchema.js';
import { hackathonSchema } from '../../schemas/index.js';

const addHackthonController = async (req, res, next) => {
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

        await insertHackathonModel(
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

export default addHackthonController;
