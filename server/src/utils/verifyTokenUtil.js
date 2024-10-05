// Importaciones
import jwt from 'jsonwebtoken';
import { generateErrorUtil } from './index.js';
import { getLastAuthUpdateModel } from '../models/index.js';

// Para poder comparar la hora del token, (en UTC) con la de la base de datos (en local) necesitamos usar moment para convertir la utc en local
import moment from 'moment-timezone';

// Tomamos la clave para desencriptar el token
const SECRET = process.env.SECRET;

////////////////////////////////////////////////////////////////////////
// Función que controla si un usuario está correctamente autenticado
// pese a recibir req, res, y next, es una función Util, no un controlador
// el único controlador que recibe 4 parámetros
//      es el middleware de manejo de errores
// Realiza las tareas comunes de los auth...Controller
//      que son quienes llaman a esta función
////////////////////////////////////////////////////////////////////////

const verifyTokenUtil = async (req, res, next, role) => {
    try {
        //tomamos el token de la cabecera
        const { authorization } = req.headers;
        //si no nos manda el token, lanzamos un error

        if (!authorization)
            generateErrorUtil('Ha de iniciar sesión para continuar', 401);

        try {
            //desencriptamos el token
            const tokenInfo = jwt.verify(authorization, SECRET);

            //Comprobamos que la fecha del token sea válida.
            const lastAuthUpdate = new Date(
                await getLastAuthUpdateModel(tokenInfo.id),
            );

            //tomamos la fecha de creación del token, en segundos,
            //la pasamos a milisegundos
            //usamos moment para convertirla de utc a local de Europa/Madrid
            //convertimos el resultado en Date para operar con el con facilidad
            const tokenEmissionDate = new Date(
                moment.tz(tokenInfo.iat * 1000, 'Europe/Madrid').utc(true),
            );

            if (tokenEmissionDate < lastAuthUpdate) {
                // if (tokenEmissionDate < lastAuthUpdate) {
                generateErrorUtil('Token no válido', 401);
            }

            //si hemos llegado aquí, el token es correcto
            //es momento de comprobar el rol
            if (role && tokenInfo.role !== role) {
                return generateErrorUtil(
                    'No tiene los permisos necesarios para realizar esa acción',
                    403,
                );
            }

            //lo metemos en req para que esté accesible para los demás
            req.user = tokenInfo;
            next();
        } catch (err) {
            console.error(err);
            generateErrorUtil(err.message, 401);
        }
    } catch (err) {
        next(err);
    }
};

export default verifyTokenUtil;
