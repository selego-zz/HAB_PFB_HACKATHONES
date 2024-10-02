// Importamos la función que genera un error.
import { generateErrorUtil, validateSchema } from '../../utils/index.js';

// Importamos los modelos.
import { updatePassModel } from '../../models/users/index.js';
import { updatePassSchema } from '../../schemas/index.js';

// importamos el esquema
//////

// Función controladora que le permite a un usuario cambiar su contraseña.
const updatePassController = async (req, res, next) => {
    try {
        await validateSchema(updatePassSchema, req.body);

        // Obtenemos los datos necesarios.
        const { oldPass, newPass, repeatNewPass } = req.body;

        const userId = req.user.id;

        // Si las contraseñas no coinciden lanzamos un error.
        if (newPass !== repeatNewPass) {
            generateErrorUtil('Las nuevas contraseñas no coinciden.', 409);
        }

        // Actualizamos la base de datos.

        const affectedRows = await updatePassModel(userId, oldPass, newPass);
        console.log(affectedRows);
        if (affectedRows === 0)
            generateErrorUtil('No se ha posiso cambiar la contraseña', 400);

        // Enviamos una respuesta al cliente.
        res.send({
            status: 'ok',
            message: 'Contraseña actualizada con éxito.',
        });
    } catch (err) {
        next(err);
    }
};

export default updatePassController;
