import getPool from '../../db/getPool.js';

//////

// Función que realiza una consulta a la base de datos para insertar un nuevo usuario.
const addHackathonInscriptionModel = async (hackathonId, userId) => {
    const pool = await getPool();

    // Comprobamos si el plazo de inscripción ha terminado.
    const [hackathon] = await pool.query(
        `SELECT inscriptionDate, inscriptionEnd, maxParticipants, 
        (SELECT COUNT(*) FROM enrollsIn WHERE hackathonId = ?) AS currentParticipants 
        FROM hackathons WHERE id = ?`,
        [hackathonId, hackathonId],
    );

    if (!hackathon.length) {
        throw new Error('Hackathon no encontrado');
    }

    const {
        inscriptionDate,
        inscriptionEnd,
        maxParticipants,
        currentParticipants,
    } = hackathon[0];

    // Verificamos que la inscripción esté dentro del plazo
    const now = new Date();
    const inscriptionStartDate = new Date(inscriptionDate);
    const inscriptionEndDate = new Date(inscriptionEnd);

    if (now < inscriptionStartDate) {
        throw new Error('Todavía no están abiertas las inscripciones');
    }

    if (now > inscriptionEndDate) {
        throw new Error('Lo sentimos, el plazo de inscripción ya ha pasado');
    }

    // Comprobamos si se ha alcanzado el número máximo de participantes.
    if (currentParticipants >= maxParticipants) {
        throw new Error(
            'Lo sentimos, todas las plazas para este hackathon ya están llenas',
        );
    }

    // Insertamos la inscripción.
    const [res] = await pool.query(
        `INSERT INTO enrollsIn (userId, hackathonid, inscriptiondate) 
        VALUES (?, ?, NOW())`,
        [userId, hackathonId],
    );

    return res.insertId;
};

export default addHackathonInscriptionModel;
