const getInscriptions = (WHERE) => {
    const campos = `e.rating, e.score,
    e.inscriptionDate,
    e.attended,
    h.id, 
    h.name, 
    h.logo, 
    h.online, 
    h.hackathonDate, 
    h.hackathonEnd, 
    h.location, 
    h.updatedAt,         
    u.username, 
    u.avatar `;
    const sql = `SELECT  ${campos}, u.id AS userId, 
    AVG(e.rating) AS average_rating
        FROM 
    enrollsin e
    JOIN 
    hackathons h ON e.hackathonId = h.id
    JOIN 
    users u ON e.userId = u.id
        ${WHERE}
        GROUP BY ${campos}, u.id `;

    return sql;
};

export { getInscriptions };
