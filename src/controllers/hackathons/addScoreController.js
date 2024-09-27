import { addScoreModel } from '../../models/hackathons/addScoreModel.js';
import { validateSchema } from '../../utils/index.js';
import { userScoreSchema } from '../../schemas/index.js';

//////

const addScoreController = async (req, res, next) => {
    try {
        await validateSchema(userScoreSchema, req.body);
        const { userId, hackathonId, score } = req.body;

        const newScore = await addScoreModel(userId, hackathonId, score);

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