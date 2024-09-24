// Importamos las dependencias.
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Importamos los modelos.
import selectUserByEmailModel from '../../models/users/selectUserByEmailModel.js';

// Importamos la función que valida esquemas.
import validateSchema from '../../utilities/validateSchema.js';

// Importamos el esquema de Joi.
import loginUserSchema from '../../schemas/users/loginUserSchema.js';

// Importamos los errores.
import generateErrorUtil from '../../utils/generateErrorUtil.js';

// Importamos las variables de entorno.
import { SECRET } from '../../../env.js';

// Función controladora final que logea a un usuario retornando un token.
const loginUserController = async (req, res, next) => {
    try {
        // Validamos los datos con Joi.
        await validateSchema(loginUserSchema, req.body);

        const { email, password } = req.body;

        // Seleccionamos los datos del usuario.
        const user = await selectUserByEmailModel(email);

        // Variable que almacenará un valor booleano indicando si la contraseña es correcto o no.
        let validPass;

        // Si existe un usuario comprobamos si la contraseña coincide.
        if (user) {
            validPass = await bcrypt.compare(password, user.password);
        }

        // Si no existe usuario o si las contraseñas no coinciden lanzamos un error.
        if (!user || !validPass) {
            generateErrorUtil('Credenciales inválidas.', 401);
        }

        // Si el usuario no está activo lanzamos un error.
        if (!user.active) {
            generateErrorUtil('Usuario pendiente de activar.', 403);
        }

        // Creamos un objeto con la info que queremos meter en el token.
        const tokenInfo = {
            id: user.id,
            username: user.username,
            role: user.role,
            email: user.email,
        };

        // Creamos el token.
        const token = jwt.sign(tokenInfo, SECRET, {
            expiresIn: '1m',
        });

        res.send({
            status: 'ok',
            data: {
                token,
            },
        });
    } catch (err) {
        next(err);
    }
};

export default loginUserController;