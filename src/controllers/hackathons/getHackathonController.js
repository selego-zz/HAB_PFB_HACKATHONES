import generateErrorUtil from '../../utils/generateErrorUtil.js';
import getHackathonById from '../../models/hackathons/getHackathonByIdModel.js';

const getHackathonController = (req, res, next) => {
    try {
        const { hackathonId } = req.params;
        const hackathon = getHackathonById(hackathonId);
        if (!hackathon) {
            generateErrorUtil('Hackathon no encontrado', 404);
        }
        res.send({
            status: 'ok',
            message: 'Hackathon obtenido',
            data: hackathon,
        });
    } catch (err) {
        next(err);
    }
};
export default getHackathonController;
