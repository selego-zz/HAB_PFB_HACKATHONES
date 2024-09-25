import express from 'express';

import {
    newUserController,
    validateUserController,
    loginUserController,
    getOwnUserController,
    changePassController,
    updateUserController,
    generateRecoverCodeController,
    recoverPasswordController,
} from '../controllers/users/index.js';

import { authUserController } from '../middlewares/index.js';

//////

const router = express.Router();

//Middleware que registra un nuevo usuario
router.post('/api/users/register', newUserController);

//Middleware que valida un nuevo usuario
router.get(
    '/api/users/register/validate/:validationCode',
    validateUserController,
);
//al principio get

//Middleware que logea un usuario ya creado.
router.post('/api/users/login', loginUserController);

//MIddleware que devuelve el perfil del usuario
router.get('/api/user', authUserController, getOwnUserController);

//MIdelware que actualiza el perfil del usuario
router.put('/api/users/update', authUserController, updateUserController);
router.put('api/users/password', authUserController, changePassController);

//Middleware que envía códico de recuperación de contraseña
router.put('/api/users/password/recover', generateRecoverCodeController);

//Middleware que cambia la contraseña recuperada
router.put(
    '/api/users/password/recover/:recoverPassCode',
    recoverPasswordController,
);
