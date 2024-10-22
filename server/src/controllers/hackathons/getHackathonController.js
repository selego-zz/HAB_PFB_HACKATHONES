// Importaciones
import { generateErrorUtil } from '../../utils/index.js';
import { getHackathonByIdModel } from '../../models/index.js';

//////

const getHackathonController = async (req, res, next) => {
    try {
        const { hackathonId } = req.params;
        const hackathon = await getHackathonByIdModel(hackathonId);
        if (!hackathon) {
            generateErrorUtil(
                'Hackathon ' + hackathonId + ' no encontrado',
                404,
            );
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
