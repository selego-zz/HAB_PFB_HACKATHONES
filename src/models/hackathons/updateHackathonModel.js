import getPool from '../../db/getPool.js';

/////////////////////////////////////////////////////////////////
// Modelo que actualiza los datos de un hackathon en la base de datos
// Recibe un JSON con los datos del hackathon que se quieren actualizar
//       la única clave obligatoria del JSON es id (el ID del hackathon).
//       Todos los demás campos de la tabla solo serán necesarios
//       en caso de querer actualizar su valor
//       No cambia la clave id
// Devuelve el número de registros afectados, que debería ser 1
/////////////////////////////////////////////////////////////////

const updateHackathonModel = async (hackathon) => {
    const pool = await getPool();

    // El campo id es obligatorio
    if (!hackathon.id) return;

    // Guardamos el ID del hackathon y lo eliminamos temporalmente del objeto
    const hackathonId = hackathon.id;
    delete hackathon.id;

    // Cada vez que hacemos un update hay que actualizar updatedAt
    let sql = 'UPDATE hackathons SET updatedAt = NOW()';
    let args = [];

    // Para cada clave-valor, los añadimos al SQL como ? para evitar SQL injection
    // y al array de argumentos, para ponerlo como segundo parámetro en el query
    for (let [key, value] of Object.entries(hackathon)) {
        sql += ', ?? = ?';
        args.push(key);
        args.push(value);
    }

    // Añadimos la condición de actualización por id
    sql += ' WHERE id = ?';
    args.push(hackathonId);

    // Ejecutamos la consulta
    const [res] = await pool.query(sql, args);

    // Volvemos a asignar el id al objeto por si se requiere
    hackathon.id = hackathonId;

    // Devolvemos el número de filas afectadas
    return res.affectedRows;
};

export default updateHackathonModel;
