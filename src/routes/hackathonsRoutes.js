import express from 'express';

const router = express.Router();

import {
    authUserController,
    authHostController,
    authDeveloperController,
} from '../middlewares/index.js';

import {
    addRankingController,
    addHackathonController,
    deleteHackathonController,
    getAllHackathonsController,
    getHackathonController,
    getTechnologiesController,
    getThemesController,
    getUsersHackathonController,
    hackathonEnrollController,
    putRatingController,
    updateHackathonController,
} from '../controllers/hackathons/index.js';

//Middleware que devuelve el listado de eventos de hackathones.
router.get('/hackathons', getAllHackathonsController);

//Middleware que añade un evento de hackathon.
router.post('/hackathons', authHostController, addHackathonController);

//Middleware que actualiza un evento de hackathon.
router.put('/hackathons/update', authHostController, updateHackathonController);

//Middleware que devuelve información sobre un evento de hackathon.
router.get(
    '/hackathons/:hackatonsId',
    authUserController,
    getHackathonController,
);

//Middleware que realiza la inscripción a un evento de hackathone.
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

//Middleware para valorar el evento de hackatone
router.put(
    '/hackathons/:hackathonsId/rating',
    authDeveloperController,
    putRatingController,
);

//Middleware que clasifica a los participantes después del evento de hackathon.
router.put(
    '/hackathons/:hacakathonId/:developerId/classification',
    authHostController,
    addRankingController,
);

router.get('/technologies', getTechnologiesController);

router.get('/theme', getThemesController);

export default router;
