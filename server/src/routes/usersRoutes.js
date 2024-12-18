import express from 'express';

import {
    activateOrganizerController,
    addUserController,
    validateUserController,
    loginUserController,
    getAllUsersController,
    getOwnUserController,
    updatePassController,
    updateUserController,
    generateRecoverCodeController,
    recoverPasswordController,
    addOrganizerController,
    deleteUserController,
} from '../controllers/users/index.js';

import {
    authUserController,
    authAdminController,
} from '../middlewares/index.js';

//////

const router = express.Router();

// Middleware que registra un nuevo usuario
router.post('/users/register', addUserController);

// Middleware para que el administrador registre un organizador
router.put(
    '/users/addOrganizer/:userId',
    authAdminController,
    activateOrganizerController,
);

// Middleware de solicitud de alta al administrador para registrarse como organizadores
router.post('/users/organizers/request', addOrganizerController);

// Middleware que valida un nuevo usuario
router.patch(
    '/users/register/validate/:activationCode',
    validateUserController,
);

// Middleware que logea un usuario ya creado.
router.post('/users/login', loginUserController);

// Middleware que devuelve el perfil del usuario
router.get('/users', authUserController, getOwnUserController);
router.get('/users/getAllUsers', authAdminController, getAllUsersController);

// Midelware que actualiza el perfil del usuario
router.put('/users/update', authUserController, updateUserController);
router.put('/users/password', authUserController, updatePassController);

// Middleware que envía códico de recuperación de contraseña
router.put('/users/password/recover', generateRecoverCodeController);

// Middleware que cambia la contraseña recuperada
router.put(
    '/users/password/recover/:recoverPassCode',
    recoverPasswordController,
);
// Middlware para eliminar un usuario
router.delete(
    '/users/delete/:userId',
    authUserController,
    deleteUserController,
);
export default router;
