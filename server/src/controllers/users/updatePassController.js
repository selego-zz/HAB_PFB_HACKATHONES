// Importaciones
import { generateErrorUtil, validateSchema } from '../../utils/index.js';
import { updatePassSchema } from '../../schemas/index.js';

import { updatePassModel } from '../../models/users/index.js';

//////

// Función controladora que le permite a un usuario cambiar su contraseña.
const updatePassController = async (req, res, next) => {
    try {
        console.log(req.body);
        await validateSchema(updatePassSchema, req.body);

        // Obtenemos los datos necesarios.
        const { oldPass, newPass } = req.body;

        const userId = req.user.id;

        // Actualizamos la base de datos.
        const affectedRows = await updatePassModel(userId, oldPass, newPass);
        if (affectedRows === 0)
            generateErrorUtil('No se ha posiso cambiar la contraseña', 400);

        // Enviamos respuesta.
        res.send({
            status: 'ok',
            message: 'Contraseña actualizada con éxito.',
        });
    } catch (err) {
        next(err);
    }
};

export default updatePassController;
