import getPool from '../../db/getPool.js';

//////

// Función que realiza una consulta a la base de datos para insertar un nuevo usuario.
const addHackathonModel = async (
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

    // Insertamos el hackathon.
    const [res] = await pool.query(
        `INSERT INTO hackathons(inscriptionDate,
            inscriptionEnd,
            hackathonDate,
            hackathonEnd,
            maxParticipants,
            prizes,
            logo,
            online,
            location,
            documentation,
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
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
        ],
    );
    return res.insertId;
};

export default addHackathonModel;
