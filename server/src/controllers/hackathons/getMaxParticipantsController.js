// Importaciones
import { getMaxParticipantsModel } from '../../models/index.js';

//////

const getMaxParticipantsController = async (req, res, next) => {
    try {
        const maxParticipants = await getMaxParticipantsModel();
        res.send({
            status: 'ok',
            message: 'Participantes máximos obtenido',
            data: maxParticipants,
        });
    } catch (err) {
        next(err);
    }
};
export default getMaxParticipantsController;
