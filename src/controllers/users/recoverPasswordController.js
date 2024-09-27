import { updateResetPassModel } from '../../models/users/index.js';
import { recoverPassSchema } from '../../schemas/index.js';
import { generateErrorUtil, validateSchema } from '../../utils/index.js';

/////////////////////////////////////////////////////////////////
// Controlador que actualiza la contraseña por una nueva
//       siempre que el recoverPassCode sea correcto, y
//       la contraseña coincida con la contraseña repetida
// Recibe por param el recoverPassCode
//       además recibe un JSON con los campos de contraseña:
//       newPass, repeatNewPass
/////////////////////////////////////////////////////////////////

const recoverPasswordController = async (req, res, next) => {
    try {
        await validateSchema(recoverPassSchema, req.body);

        const recoverPassCode = req.params.recoverPassCode;
        const { newPass, repeatNewPass } = req.body;

        // Si las contraseñas no coinciden lanzamos un error.
        if (newPass !== repeatNewPass) {
            generateErrorUtil('Las nuevas contraseñas no coinciden.', 409);
        }

        const affectedRows = updateResetPassModel(recoverPassCode, newPass);
        if (affectedRows < 1) generateErrorUtil('Código no encontrado', 404);
        res.send({
            status: 'ok',
            message: 'datos actualizados',
        });
    } catch (err) {
        next(err);
    }
};
export default recoverPasswordController;
