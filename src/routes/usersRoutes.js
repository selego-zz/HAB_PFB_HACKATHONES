import express from 'express';

const router = express.Router();

//Middleware que registra un nuevo usuario
router.post('/api/users/register');

//Middleware que valida un nuevo usuario
router.put('/api/users/register/validate/:validationCode');

//Middleware que logea un usuario ya creado.
router.post('/api/users/login');

//MIddleware que devuelve el perfil del usuario
router.get('/api/users/');

//MIdelware que actualiza el perfil del usuario
router.put('/api/users/update');

//Middleware que envía códico de recuperación de contraseña
router.put('/api/users/password/recover');

//Middleware que cambia la contraseña recuperada
router.put('/api/users/password/reset/:recoverPassCode');
