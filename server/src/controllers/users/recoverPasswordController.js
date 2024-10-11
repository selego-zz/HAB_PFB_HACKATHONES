// Importanciones
import { recoverPassSchema } from '../../schemas/index.js';
import { generateErrorUtil, validateSchema } from '../../utils/index.js';
import { updateResetPassModel } from '../../models/index.js';

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
        const { password } = req.body;

        const affectedRows = updateResetPassModel(recoverPassCode, password);
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
