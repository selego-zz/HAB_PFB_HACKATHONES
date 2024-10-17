// Importaciones
import jwt from 'jsonwebtoken';
import { generateErrorUtil } from '../utils/index.js';
import { getLastAuthUpdateModel } from '../models/index.js';

// Para poder comparar la hora del token, (en UTC) con la de la base de datos (en local) necesitamos usar moment para convertir la utc en local
import moment from 'moment-timezone';

// Tomamos la clave para desencriptar el token
const SECRET = process.env.SECRET;

//Si tenemos un token, extraemos sus datos y los guardamos en req.
//Si no tenemos un token, no lanza error porque cualquiera puede acceder.
const optionalAuthController = async (req, res, next) => {
    try {
        //tomamos el token de la cabecera
        const { authorization } = req.headers;
        //si no nos manda el token, lanzamos un error

        //Si desde el front mandan una autorización pero no están logeados para ellos en undefined pero al grabarlo en la variable a nosotros nos llega com ouna cadena.
        if (!authorization || authorization === 'null') {
            next();
            return;
        }

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

export default optionalAuthController;
