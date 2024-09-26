import { generateErrorUtil, validateSchema } from '../../utils/index.js';
import { getAllHackathonsModel } from '../../models/index.js';
import { hackathonFilterSchema } from '../../schemas/index.js';
const getHackathonsController = async (req, res, next) => {
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

export default getHackathonsController;
