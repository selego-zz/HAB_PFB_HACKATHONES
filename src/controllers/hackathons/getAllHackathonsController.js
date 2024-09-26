import { generateErrorUtil, validateSchema } from '../../utils/index.js';
import getAllHackathonsModel from '../../models/hackathons/getAllHackathonsModel.js';
import { hackathonFilterSchema } from '../../schemas/index.js';

//////

const getAllHackathonsController = async (req, res, next) => {
    try {
        await validateSchema(hackathonFilterSchema, req.body);
        const hackathons = await getAllHackathonsModel(req.body);

        if (!hackathons || hackathons.length === 0) {
            throw generateErrorUtil('No se encontraron hackatones', 404);
        }

        res.send({
            status: 'ok',
            message: 'Hackatones obtenidos',
            data: hackathons,
        });
    } catch (err) {
        next(err);
    }
};

export default getAllHackathonsController;
