// Importaciones
import { getAllInscriptionsFromAHackathonModel } from '../../models/index.js';

/////////////////////////////////////////////////////////////////
// Controlador que devuelve todos los inscritos a un hackathon
/////////////////////////////////////////////////////////////////
const getAllInscriptionsFromAHackathonController = async (req, res, next) => {
    try {
        const { hackathonId } = req.params;

        const hackathons = await getAllInscriptionsFromAHackathonModel(
            hackathonId,
            req.user.id,
            req.user.role,
        );

        let message =
            hackathons.length > 0
                ? 'Hackatones obtenidos'
                : 'No se encontraron hackathones que cumplan los criterios de búsqueda';
        res.send({
            status: 'ok',
            message,
            data: hackathons,
        });
    } catch (err) {
        next(err);
    }
};

export default getAllInscriptionsFromAHackathonController;
