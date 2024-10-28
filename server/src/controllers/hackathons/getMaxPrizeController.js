// Importaciones
import { getMaxPrizeModel } from '../../models/index.js';

//////

const getMaxPrizeController = async (req, res, next) => {
    try {
        const maxPrize = await getMaxPrizeModel();
        res.send({
            status: 'ok',
            message: 'Premio Máximo obtenido',
            data: maxPrize,
        });
    } catch (err) {
        next(err);
    }
};
export default getMaxPrizeController;
