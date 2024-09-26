import { insertScoreModel } from '../../models/hackathons/index.js';

//////

const addScoreController = async (req, res, next) => {
    try {
        const { userId, hackathonId, score } = req.body;

        /* if (!userId || !score) {
            throw generateErrorUtil('Faltan campos', 400);
        } */ // FALTA SUSTITUIR ESTO POR EL SCHEMA

        const newScore = await insertScoreModel(userId, hackathonId, score);

        res.status(201).send({
            status: 'ok',
            message: 'Puntuación guardada',
            data: newScore,
        });
    } catch (err) {
        next(err);
    }
};

export default addScoreController;
