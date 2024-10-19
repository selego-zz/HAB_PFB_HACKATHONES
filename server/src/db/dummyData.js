import bcrypt from 'bcrypt';

import getPool from './getPool.js';

import {
    enrollsIn,
    hackathonTechnologies,
    hackathonThemes,
    hackathons,
    users,
} from './dummyData/index.js';

const addDummyData = async () => {
    const pool = await getPool();
    ///////////////////////////////////////////////
    //insertamos los datos de la tabla usuarios
    //aprovechamos el mismo bucle para meterles tecnologías
    ///////////////////////////////////////////////
    const technologies = process.env.DB_TECHNOLOGIES.split(',').map(
        (technology) => technology.replace(/^"|"$/g, ''),
    );
    for (const data of users) {
        const [res] = await pool.query(
            `    
            INSERT INTO users (
                username, 
                email, 
                password,
                firstname,
                lastname, 
                role,
                biography,
                linkedIn,
                avatar, 
                active)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, true)`,
            [
                data.username,
                data.email,
                await bcrypt.hash(data.password, 10),
                data.firstName,
                data.lastName,
                data.role,
                data.biography,
                data.linkedIn,
                data.avatar,
            ],
        );

        if (data.role === 'desarrollador') {
            const tecs = [];
            const nTec = Math.floor(Math.random() * 5);
            for (let i = 0; i < nTec; i++) {
                const actualTec = Math.ceil(
                    Math.random() * technologies.length,
                );
                if (!tecs.includes(actualTec)) {
                    tecs.push(actualTec);
                    await pool.query(
                        'INSERT INTO userTechnologies (userId, technologyId) VALUES (?, ?)',
                        [res.insertId, actualTec],
                    );
                }
            }
        }
    }

    ///////////////////////////////////////////////
    //insertamos los datos de la tabla hackathons
    ///////////////////////////////////////////////
    for (const data of hackathons) {
        await pool.query(
            `    
            INSERT INTO hackathons (
                organizerId,
                name,
                inscriptionDate,
                inscriptionEnd,
                hackathonDate,
                hackathonEnd,
                maxParticipants,
                online,
                location,
                prizes,
                logo
                )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                data.organizerId,
                data.name,
                data.inscriptionDate.slice(0, -1),
                data.inscriptionEnd.slice(0, -1),
                data.hackathonDate.slice(0, -1),
                data.hackathonEnd.slice(0, -1),
                data.maxParticipants,
                data.online,
                data.location,
                data.prizes,
                data.logo,
            ],
        );
    }

    ///////////////////////////////////////////////
    //insertamos los datos de la tabla enrollsIn
    ///////////////////////////////////////////////
    for (const data of enrollsIn) {
        await pool.query(
            `    

            INSERT INTO enrollsIn (
                userId,
                hackathonId,
                inscriptionDate,
                attended,
                rating,
                score
                )
        VALUES (?, ?, ?, ?, ?, ?)`,
            [
                data.userId,
                data.hackathonId,
                data.inscriptionDate.slice(0, -1),
                data.attended,
                data.rating,
                data.score,
            ],
        );
    }

    ///////////////////////////////////////////////
    //insertamos los datos de la tabla hackathonTemes
    ///////////////////////////////////////////////
    for (const data of hackathonThemes) {
        for (const themeId of data.themeId) {
            await pool.query(
                `    
                INSERT INTO hackathonThemes (
                    hackathonId,
                    themeId
                    )
                VALUES (?, ?)`,
                [data.hackathonId, themeId],
            );
        }
    }
    ///////////////////////////////////////////////
    //insertamos los datos de la tabla hackathonTemes
    ///////////////////////////////////////////////
    for (const data of hackathonTechnologies) {
        for (const technologyId of data.technologyId) {
            await pool.query(
                `    
                INSERT INTO hackathonTechnologies (
                    hackathonId,
                    technologyId
                )
                VALUES (?, ?)`,
                [data.hackathonId, technologyId],
            );
        }
    }
};

export default addDummyData;
