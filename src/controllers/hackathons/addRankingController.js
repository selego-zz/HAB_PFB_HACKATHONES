import { insertRatingModel } from '../../models/hackathons';
import { generateErrorUtil } from '../../utils';

const addRankingController = async (req, res, next) => {
    try {
        const { userId, score } = req.body;

        if (!userId || !score) {
            throw generateErrorUtil('userId y score son requeridos', 400);
        }

        const newRanking = await insertRatingModel({ userId, score });

        res.status(201).send({
            status: 'ok',
            message: 'Ranking guardado',
            data: newRanking,
        });
    } catch (err) {
        next(err);
    }
};

export default addRankingController;
