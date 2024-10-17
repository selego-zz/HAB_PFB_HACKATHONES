import getPool from '../../db/getPool.js';
import { generateErrorUtil } from '../../utils/index.js';

//////

// Función que realiza una consulta a la base de datos para insertar un nuevo usuario.
const addHackathonModel = async (
    name,
    organizerid,
    inscriptionDate,
    inscriptionEnd,
    hackathonDate,
    hackathonEnd,
    maxParticipants,
    prizes,
    logo,
    online,
    location,
    documentation,
) => {
    const pool = await getPool();

    // Comprobamos que no haya un hackathon con ese nombre.
    const [duplicate] = await pool.query(
        `SELECT id FROM hackathons WHERE name = ?`,
        [name],
    );

    if (duplicate.length > 0) {
        generateErrorUtil('Nombre de hackathon no disponible', 409);
    }

    // Comprobamos que las fechas están en el formato correcto para la inserción.
    if (inscriptionDate[inscriptionDate.length - 1].toUpperCase() === 'Z') {
        inscriptionDate = inscriptionDate.slice(0, -1);
    }

    if (inscriptionEnd[inscriptionEnd.length - 1].toUpperCase() === 'Z') {
        inscriptionEnd = inscriptionEnd.slice(0, -1);
    }

    if (hackathonDate[hackathonDate.length - 1].toUpperCase() === 'Z') {
        hackathonDate = hackathonDate.slice(0, -1);
    }

    if (hackathonEnd[hackathonEnd.length - 1].toUpperCase() === 'Z') {
        hackathonEnd = hackathonEnd.slice(0, -1);
    }

    //
    let sql = `INSERT INTO hackathons(
            name,
            organizerId,    
            inscriptionDate,
            inscriptionEnd,
            hackathonDate,
            hackathonEnd,
            maxParticipants,
            prizes,
            online,
            location,
            documentation`;
    if (logo) sql += ', logo';
    sql += `) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?`;
    if (logo) sql += ', ?';
    sql += ')';

    const args = [
        name,
        organizerid,
        inscriptionDate,
        inscriptionEnd,
        hackathonDate,
        hackathonEnd,
        maxParticipants,
        prizes,
        online,
        location,
        documentation,
    ];
    if (logo) args.push(logo);

    // Insertamos el hackathon.
    const [res] = await pool.query(sql, args);
    return res.insertId;
};

export default addHackathonModel;
