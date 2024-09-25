import { getPool } from '../../db/index.js';

/////////////////////////////////////////////////////////////////
// Modelo que actualiza los datos del usuario en la base de datos
// Recibe un JSON con los datos del usuario que se quieren actualizar
//       la única clave obligatorio del json es id.
//       Todos los demás campos de la tabla solo serán necesarios
//       en caso de querer actualizar su valor
//       no cambia la clave
// Devuelve el número de registros afectados, que debería ser 1
/////////////////////////////////////////////////////////////////

const updateUserModel = async (user) => {
    const pool = await getPool();

    // el campo id es obligatorio
    if (!user.id) return;

    //quitamos el campo id del Json, por que con un for recorreremos los demás añadiendolos a la sentencia SQL
    //podríamos dejarlo, y en el bucle for comprobar en cada iteración que no es la clave id.
    //pero me parecía menos optimo
    //al final de la función lo volvemos a meter
    const userId = user.id;
    delete user.id;

    //también quitamos password
    const password = user.password; //al final pondremos la contraseña sin encriptar nuevamente en el JSON, por si se requiere para algo

    //cada vez que hacemos un update hay que actualziar updatedAt
    let sql = 'UPDATE users SET updatedAt = NOW()';
    let args = [];

    //para cada clave-valor, los añadimos al sql como ? para evitar código malicioso
    // y al array de argumentos, para ponerlo como segundo parámetro del query
    for (let [key, value] of Object.entries(user)) {
        sql += ', ?? = ?';
        args.push(key);
        args.push(value);
    }
    sql += ' where id = ?';
    args.push(userId);

    const [res] = await pool.query(sql, args);

    user.id = userId;
    user.password = password;
    return res.affectedRows;
};

export default updateUserModel;
