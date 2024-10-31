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
    description,
    requirements,
    technologies,
    themes,
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
            location`;
    if (logo) sql += ', logo';
    if (documentation) sql += ', documentation';
    if (description) sql += ', description';
    if (requirements) sql += ', requirements';
    sql += `) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?`;
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
    ];

    if (logo) {
        sql += ', ?';
        args.push(logo);
    }
    if (documentation) {
        sql += ', ?';
        args.push(documentation);
    }
    if (description) {
        sql += ', ?';
        args.push(description);
    }
    if (requirements) {
        sql += ', ?';
        args.push(requirements);
    }
    sql += ')';

    // Insertamos el hackathon.
    const [res] = await pool.query(sql, args);

    for (const technology of technologies) {
        await pool.query(
            'INSERT INTO hackathonTechnologies (hackathonId, technologyId) VALUES(?, (SELECT id FROM technologies WHERE technology = ?))',
            [res.insertId, technology],
        );
    }
    for (const theme of themes)
        await pool.query(
            'INSERT INTO hackathonThemes (hackathonId, themeId) VALUES(?, (SELECT id FROM themes WHERE theme = ?))',
            [res.insertId, theme],
        );
    return res.insertId;
};

export default addHackathonModel;
