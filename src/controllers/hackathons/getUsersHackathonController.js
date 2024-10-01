// Importaciones
import {
    getUserHackathonsModel,
    getAllInscriptionsModel,
} from '../../models/index.js';

import generateErrorUtil from '../../utils/generateErrorUtil.js';

//////

const getUsersHackathonController = async (req, res, next) => {
    try {
        console.log('HOLA');

        // Obtenemos el rol del usuario desde el token (administrador o usuario normal).
        const { role, id: userId } = req.user;

        let hackathons;

        // Si el usuario es administrador, listamos todas las inscripciones.
        if (role === 'administrador') {
            console.log('administrador');

            hackathons = await getAllInscriptionsModel();
        } else {
            // Si no es administrador, listamos solo las inscripciones del usuario autenticado.
            console.log('desarrollador');

            hackathons = await getUserHackathonsModel(userId);
        }

        // Si no se encuentran inscripciones, lanzamos un error.
        if (hackathons.length === 0) {
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
