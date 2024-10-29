import express from 'express';

const router = express.Router();

import {
    authUserController,
    authOrganizerController,
    authDeveloperController,
} from '../middlewares/index.js';

import {
    updateScoreController,
    addHackathonController,
    deleteHackathonController,
    deleteHackathonInscriptionController,
    getAllHackathonsController,
    getAllInscriptionsFromAHackathonController,
    getHackathonController,
    getMaxParticipantsController,
    getMaxPrizeController,
    getTechnologiesController,
    getThemesController,
    getUsersHackathonController,
    addHackathonInscriptionController,
    updateRatingController,
    updateHackathonController,
} from '../controllers/hackathons/index.js';

//////

// Middleware que devuelve el listado de eventos de hackathons. Puede aceptar filtros y orden en el body
router.get('/hackathons', getAllHackathonsController);

// Middleware que añade un evento de hackathon.
router.post('/hackathons', authOrganizerController, addHackathonController);

// Middleware que actualiza un evento de hackathon.
router.put(
    '/hackathons/:hackathonId/update',
    authOrganizerController,
    updateHackathonController,
);

// Middleware que devuelve información sobre un evento de hackathon.
router.get('/hackathons/:hackathonId', getHackathonController);

// Middleware que devuelve los inscritos de hackathon.
router.get(
    '/hackathons/:hackathonId/enrollments',
    authUserController,
    getAllInscriptionsFromAHackathonController,
);

// Middleware que realiza la inscripción a un evento de hackathon.
router.post(
    '/hackathons/:hackathonId/registration',
    authDeveloperController,
    addHackathonInscriptionController,
);

// Middleware que devuelve una lista de los eventos de hackathon donde el usuario está registrado.
router.get(
    '/hackathons/user/hackathons',
    authUserController,
    getUsersHackathonController,
);

// Middleware que elimina un hackathon.
router.delete(
    '/hackathons/:hackathonId/delete',
    authOrganizerController,
    deleteHackathonController,
);

// Middleware que elimina una inscripción a un evento de hackathon.
router.delete(
    '/hackathons/:hackathonId/cancel',
    authDeveloperController,
    deleteHackathonInscriptionController,
);

// Middleware para valorar el evento de hackaton.
router.put(
    '/hackathons/:hackathonId/rating',
    authDeveloperController,
    updateRatingController,
);

// Middleware que clasifica a los participantes después del evento de hackathon.
router.put(
    '/hackathons/:hackathonId/ranking',
    authOrganizerController,
    updateScoreController,
);

//Devuelve el número máximo de plazas del hackathon que más plazas permite tener.
router.get('/maxParticipants', getMaxParticipantsController);

//Devuelve el premio máximo que se oferta entre todos los hackathons.
router.get('/maxPrize', getMaxPrizeController);

//Devuelve un listado de tecnologías de los hackathons. Ninguna autenticación.
router.get('/technologies', getTechnologiesController);

//Devuelve un listado de temas de los hackathons. Ninguna autenticación.
router.get('/themes', getThemesController);

export default router;
