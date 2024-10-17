// Importamos dependencias.
import mysql from 'mysql2/promise';
import { generateErrorUtil } from '../utils/index.js';

// Variables de entorno para la conexión con la base de datos.
const { MYSQL_HOST, MYSQL_USER, MYSQL_PASS, MYSQL_DB } = process.env;

//////

// Variable en la que almacenamos la base de datos.
let pool;

// Función que retorna el pool de la conexión a la base de datos
const getPool = async () => {
    try {
        //Si no existe la conexión, la creamos.
        if (!pool) {
            pool = mysql.createPool({
                host: MYSQL_HOST,
                user: MYSQL_USER,
                password: MYSQL_PASS,
            });

            //creamos la base de datos
            await pool.query(`CREATE DATABASE IF NOT EXISTS ${MYSQL_DB}`);

            //Seleccionamos la base de datos creada
            pool = mysql.createPool({
                host: MYSQL_HOST,
                user: MYSQL_USER,
                password: MYSQL_PASS,
                database: MYSQL_DB,
            });
        }

        if (!pool)
            generateErrorUtil(
                'No se ha podido establecer conexión con la base de datos',
                503,
            );

        return pool;
    } catch (err) {
        console.error(err);
    }
};

export default getPool;
