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
    ///////////////////////////////////////////////
    for (const data of users) {
        await pool.query(
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
    }

    ///////////////////////////////////////////////
    //insertamos los datos de la tabla hackathons
    ///////////////////////////////////////////////
    let i = 0;
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
                'logo' + i > 9 ? i : '0' + i,
            ],
        );
        i++;
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
