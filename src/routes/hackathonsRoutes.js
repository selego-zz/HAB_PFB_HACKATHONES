import express from 'express';

const router = express.Router();

import {
    authUserController,
    authOrganizerController,
    authDeveloperController,
} from '../middlewares/index.js';

import {
    addScoreController,
    addHackathonController,
    deleteHackathonController,
    getAllHackathonsController,
    getHackathonController,
    getTechnologiesController,
    getThemesController,
    getUsersHackathonController,
    hackathonEnrollController,
    rateHackathonController,
    updateHackathonController,
} from '../controllers/hackathons/index.js';

//Middleware que devuelve el listado de eventos de hackathones. Puede aceptar filtros y orden en el body
router.get('/hackathons', getAllHackathonsController);

//Middleware que añade un evento de hackathon.
router.post('/hackathons', authOrganizerController, addHackathonController);

//Middleware que actualiza un evento de hackathon.
router.put(
    '/hackathons/update',
    authOrganizerController,
    updateHackathonController,
);

//Middleware que devuelve información sobre un evento de hackathon.
router.get(
    '/hackathons/:hackatonsId',
    authUserController,
    getHackathonController,
);

//Middleware que realiza la inscripción a un evento de hackathon.
router.post(
    '/hackathons/registration/:hackathonsId',
    authDeveloperController,
    hackathonEnrollController,
);

//Middleware que devuelve una lista de los eventos de hackathon donde el usuario está registrado.
router.get(
    '/hackathons/userHackathons',
    authDeveloperController,
    getUsersHackathonController,
);

//Middleware que elimina una inscripción a un evento de hackathon.
router.delete(
    '/hackathons/:hackathonsId/delete',
    authDeveloperController,
    deleteHackathonController,
);

//Middleware para valorar el evento de hackaton.
router.put(
    '/hackathons/:hackathonsId/rating',
    authDeveloperController,
    rateHackathonController,
);

//Middleware que clasifica a los participantes después del evento de hackathon.
router.put(
    '/hackathons/:hacakathonId/:developerId/classification',
    authOrganizerController,
    addScoreController,
);

router.get('/technologies', getTechnologiesController);

router.get('/theme', getThemesController);

export default router;
