import getPool from '../../db/getPool.js';

/////////////////////////////////////////////////////////////////
// Modelo para obtener el organizador de un hackathon
// Recibe el ID del hackathon (hackathonId) y devuelve el organizerId
// o `undefined` si no existe.
/////////////////////////////////////////////////////////////////

const getHackathonOrganizerModel = async (hackathonId) => {
    const pool = await getPool();

    // Consulta para obtener el organizador del hackathon
    const [rows] = await pool.query(
        'SELECT organizerId FROM hackathons WHERE id = ?',
        [hackathonId],
    );

    // Si no encuentra el hackathon, devuelve undefined
    if (rows.length === 0) {
        return undefined;
    }

    // Devuelve el organizerId (el organizador del hackathon)
    return rows[0].organizerId;
};

export default getHackathonOrganizerModel;
