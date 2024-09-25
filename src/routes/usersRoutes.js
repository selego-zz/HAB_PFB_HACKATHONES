import express from 'express';

const router = express.Router();

//Middleware que registra un nuevo usuario
router.post('/api/users/register');

//Middleware que valida un nuevo usuario
router.patch('/api/users/register/validate/:validationCode');
//al principio get

//Middleware que logea un usuario ya creado.
router.post('/api/users/login');

//MIddleware que devuelve el perfil del usuario
router.get('/api/users/');

//MIdelware que actualiza el perfil del usuario
router.put('/pi/users/update');

//Middleware que envía códico de recuperación de contraseña
router.put('/api/users/password/recover');

//Middleware que cambia la contraseña recuperada
router.put('/api/users/password/recover/:recoverPassCode');
