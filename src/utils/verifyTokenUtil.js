//importamos las dependencias
import jwt from 'jsonwebtoken';
import generateErrorUtil from './generateErrorUtil.js';

// tomamos la clave para desencriptar el token
const SECRET = process.env.SECRET;

////////////////////////////////////////////////////////////////////////
// Función que controla si un usuario está correctamente autenticado
// pese a recibir req, res, y next, es una función Util, no un controlador
// el único controlador que recibe 4 parámetros
//      es el middleware de manejo de errores
// Realiza las tareas comunes de los auth...Controller
//      que son quienes llaman a esta función
////////////////////////////////////////////////////////////////////////

const verifyTokenUtil = (req, res, next, role) => {
    try {
        //tomamos el token de la cabecera
        const { authorization } = req.headers;
        //si no nos manda el token, lanzamos un error

        if (!authorization)
            generateErrorUtil('Ha de iniciar sesión para continuar', 401);

        try {
            //desencriptamos el token

            const tokenInfo = jwt.verify(authorization, SECRET);
            //si hemos lllegado aquí, el token es correcto
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
