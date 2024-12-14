const generateGetInscriptionsSQL = (WHERE, role) => {
    let campos = `
        h.id, 
        h.name, 
        h.logo, 
        h.online, 
        h.hackathonDate, 
        h.hackathonEnd, 
        h.location, 
        h.updatedAt, 
        h.description, 
        h.requirements
    `;

    if (role === 'desarrollador') {
        campos += `,
        e.rating,
        e.score,
        e.inscriptionDate,
        e.attended,
        u.username, 
        u.avatar,
        u.id AS userId `;
    }

    const sql = `
        SELECT 
            ${campos}, 
            AVG(e.rating) AS average_rating,
            AVG(e.score) AS average_score
        FROM 
            hackathons h
        LEFT JOIN 
            enrollsin e ON e.hackathonId = h.id
        LEFT JOIN 
            users u ON e.userId = u.id
        ${WHERE}
        GROUP BY 
            h.id, 
            h.name, 
            h.logo, 
            h.online, 
            h.hackathonDate, 
            h.hackathonEnd, 
            h.location, 
            h.updatedAt, 
            h.description, 
            h.requirements
            ${
                role === 'desarrollador'
                    ? `,
            e.rating,
            e.score,
            e.inscriptionDate,
            e.attended,
            u.username, 
            u.avatar,
            u.id`
                    : ''
            }
    `;

    return sql;
};

export { generateGetInscriptionsSQL };
