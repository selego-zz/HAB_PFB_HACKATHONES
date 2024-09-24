import express from 'express';

const router = express.Router();

//Middleware que devuelve el listado de eventos de hackathones.
router.get('/api/hackathons');

//Middleware que añade un evento de hackathon.
router.post('/api/hackathons');

//Middleware que actualiza un evento de hackathon.
router.put('/api/hackathons/update');

//Middleware que devuelve información sobre un evento de hackathon.
router.get('/api/hackathons/:hackatonsId');

//Middleware que realiza la inscripción a un evento de hackathone.
router.post('/api/hackathons/registration');

//Middleware que devuelve una lista de los eventos de hackathon donde el usuario está registrado.
router.get('/api/hackathons/userHackathons');

//Middleware que elimina una inscripción a un evento de hackathon.
router.delete('/api/hackathons/delete');

//Middleware para valorar el evento de hackatone
router.put('/api/hackathons/rating');

//Middleware que clasifica a los participantes después del evento de hackathon.
router.put('/api/hackathons/classification');
