const getInscriptions = () => {
    return `SELECT e.id, e.hackathonId, e.inscriptionDate, e.attended, e.rating, e.score,
        h.name AS hackathonName, h.hackathonDate, h.hackathonEnd, h.prizes, 
        u.id AS userId, u.username, u.avatar
        FROM enrollsin e
        JOIN hackathons h ON e.hackathonId = h.id
        JOIN users u ON e.userId = u.id `;
};

export { getInscriptions };
