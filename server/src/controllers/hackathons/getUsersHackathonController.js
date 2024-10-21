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

        // Si el usuario es administrador, listamos todas las inscripciones.
        if (role === 'administrador') {
            hackathons = await getAllInscriptionsModel();
            console.log('ADMIN');

            // Si es desarrollador, listamos solo las inscripciones del usuario autenticado.
        } else if (role === 'desarrollador') {
            hackathons = await getUserHackathonsModel(userId);
            console.log('DEV');
        } else {
            // Si no es desarrollador ni administrador pero está logeado es organizador.
            hackathons = await getOrganizerHackathonsModel(userId);
            console.log('ORG');
        }

        // Si no se encuentran inscripciones, lanzamos un error.
        if (!hackathons) {
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
