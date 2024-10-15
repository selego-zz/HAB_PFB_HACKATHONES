const getInscriptions = (WHERE, role) => {
    let campos = ``;

    campos += `
    h.id, 
    h.name, 
    h.logo, 
    h.online, 
    h.hackathonDate, 
    h.hackathonEnd, 
    h.location, 
    h.updatedAt `;

    if (role === 'desarrollador')
        campos += `, 
    e.rating,
    e.score,
    e.inscriptionDate,
    e.attended,
    u.username, 
    u.avatar,
    u.id `;

    const sql = `SELECT  ${campos + (role === 'desarrollador' ? 'AS userId ' : '')}, 
    AVG(e.rating) AS average_rating,
    AVG(e.score) AS average_score
        FROM 
    enrollsin e
    JOIN 
    hackathons h ON e.hackathonId = h.id
    JOIN 
    users u ON e.userId = u.id
        ${WHERE}
        GROUP BY ${campos}`;

    return sql;
};

export { getInscriptions };
