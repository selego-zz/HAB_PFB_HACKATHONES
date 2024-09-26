import generateErrorUtil from '../../utils/generateErrorUtil.js';
import getHackathonThemesModel from '../../models/hackathons/getHackathonThemesModel.js';

const getThemesController = async (req, res, next) => {
    try {
        const themes = await getHackathonThemesModel();

        if (!themes || themes.length === 0) {
            throw generateErrorUtil('No se encontraron temas', 404);
        }

        res.send({
            status: 'ok',
            message: 'Temas obtenidos',
            data: themes,
        });
    } catch (err) {
        next(err);
    }
};

export default getThemesController;
