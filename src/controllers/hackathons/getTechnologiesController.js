import generateErrorUtil from '../../utils/generateErrorUtil.js';
import getHackathonTechnologiesModel from '../../models/hackathons/getHackathonTechnologiesModel.js';

//////

const getTechnologiesController = async (req, res, next) => {
    try {
        const technologies = await getHackathonTechnologiesModel();

        if (!technologies || technologies.length === 0) {
            throw generateErrorUtil('No se encontraron tecnologías', 404);
        }

        res.send({
            status: 'ok',
            message: 'Tecnologías obtenidas',
            data: technologies,
        });
    } catch (err) {
        next(err);
    }
};

export default getTechnologiesController;
