// Importaciones
import {
    getUserHackathonsModel,
    getAllInscriptionsModel,
    getOrganizerHackathonsModel,
} from '../../models/index.js';

import { generateErrorUtil } from '../../utils/index.js';

//////

const getUsersHackathonController = async (req, res, next) => {
    try {
        // Obtenemos el rol del usuario desde el token.
        const { role } = req.user;
        const userId = req.user.id;

        let hackathons;

        console.log(role, userId);

        // Si el usuario es administrador, listamos todas las inscripciones.
        if (role === 'administrador') {
            hackathons = await getAllInscriptionsModel();
            // Si es desarrollador, listamos solo las inscripciones del usuario autenticado.
        } else if (role === 'desarrollador') {
            hackathons = await getUserHackathonsModel(userId);
        } else {
            // Si no es desarrollador ni administrador pero está logeado es organizador.
            hackathons = await getOrganizerHackathonsModel(userId);
        }
        console.log(hackathons);

        // Si no se encuentran inscripciones, lanzamos un error.
        if (!hackathons || hackathons.length === 0) {
            generateErrorUtil('No se encontraron inscripciones', 404);
        }

        // Devolvemos la lista de inscripciones.
        res.send({
            status: 'ok',
            data: hackathons,
        });
    } catch (err) {
        next(err);
    }
};

export default getUsersHackathonController;
