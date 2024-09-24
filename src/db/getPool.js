// Importamos dependencias.
import mysql from 'mysql2/promise';

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
                timezone: 'Z',
            });

            //creamos la base de datos
            await pool.query(`CREATE DATABASE IF NOT EXISTS ${MYSQL_DB}`);

            //Seleccionamos la base de datos creada
            pool = mysql.createPool({
                host: MYSQL_HOST,
                user: MYSQL_USER,
                password: MYSQL_PASS,
                database: MYSQL_DB,
                timezone: 'Z',
            });
        }

        return pool;
    } catch (err) {
        console.error(err);
    }
};

export default getPool;
