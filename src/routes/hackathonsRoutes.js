import express from 'express';

const router = express.Router();

//Middleware que devuelve el listado de eventos de hackathones.
router.get('/api/hackathons', getAllHackathonsController);

//Middleware que añade un evento de hackathon.
router.post('/api/hackathons', authHostController, addHackathonController);

//Middleware que actualiza un evento de hackathon.
router.put(
    '/api/hackathons/update',
    authHostController,
    updateHackathonController,
);

//Middleware que devuelve información sobre un evento de hackathon.
router.get(
    '/api/hackathons/:hackatonsId',
    authUserController,
    getHackathonController,
);

//Middleware que realiza la inscripción a un evento de hackathone.
router.post(
    '/api/hackathons/registration/:hackathonsId',
    authDeveloperController,
    hackathonEnrollController,
);

//Middleware que devuelve una lista de los eventos de hackathon donde el usuario está registrado.
router.get(
    '/api/hackathons/userHackathons',
    authDeveloperController,
    getUsersHackathonController,
);

//Middleware que elimina una inscripción a un evento de hackathon.
router.delete(
    '/api/hackathons/:hackathonsId/delete',
    authDeveloperController,
    deleteHackathonController,
);

//Middleware para valorar el evento de hackatone
router.put(
    '/api/hackathons/:hackathonsId/rating',
    authDeveloperController,
    putRatingController,
);

//Middleware que clasifica a los participantes después del evento de hackathon.
router.put(
    '/api/hackathons/:hacakathonId/:developerId/classification',
    authHostController,
    addDeveloperScoreController,
);

router.get('/api/tecnologys', getTecnologyController);

router.get('/api/thematic', getThematicController);
