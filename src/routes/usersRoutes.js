import express from 'express';

import {
    addUserController,
    validateUserController,
    loginUserController,
    getOwnUserController,
    updatePassController,
    updateUserController,
    generateRecoverCodeController,
    recoverPasswordController,
} from '../controllers/users/index.js';

import {
    authUserController,
    authAdminController,
} from '../middlewares/index.js';

//////

const router = express.Router();

//Middleware que registra un nuevo usuario
router.post('/users/register', addUserController);

//Middleware para que el administrador registre un organizador
router.post('/users/addOrganizer', authAdminController, addUserController);

//Middleware que valida un nuevo usuario
router.get('/users/register/validate/:validationCode', validateUserController);
//al principio get

//Middleware que logea un usuario ya creado.
router.post('/users/login', loginUserController);

//MIddleware que devuelve el perfil del usuario
router.get('/user', authUserController, getOwnUserController);

//MIdelware que actualiza el perfil del usuario
router.put('/users/update', authUserController, updateUserController);
router.put('api/users/password', authUserController, updatePassController);

//Middleware que envía códico de recuperación de contraseña
router.put('/users/password/recover', generateRecoverCodeController);

//Middleware que cambia la contraseña recuperada
router.put(
    '/users/password/recover/:recoverPassCode',
    recoverPasswordController,
);

export default router;
