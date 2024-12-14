import bcrypt from 'bcrypt';

import getPool from './getPool.js';

import {
    enrollsIn,
    hackathonTechnologies,
    hackathonThemes,
    hackathons,
    users,
    DUMMY_TECHNOLOGIES,
    DUMMY_THEMES,
} from './dummyData/index.js';

const addDummyData = async () => {
    const pool = await getPool();
    ///////////////////////////////////////////////
    //insertamos los datos de la tabla usuarios
    //aprovechamos el mismo bucle para meterles tecnologías
    ///////////////////////////////////////////////

    const themes = Array.from(
        new Set(
            (DUMMY_THEMES + ',' + process.env.DB_THEMES)
                .split(',')
                .map((theme) => theme.replace(/(^"|"$)/g, '')), //esto ultimo quita la comilla inicial y final
        ),
    );
    const technologies = Array.from(
        new Set(
            (DUMMY_TECHNOLOGIES + ',' + process.env.DB_TECHNOLOGIES)
                .split(',')
                .map((technology) => technology.replace(/(^"|"$)/g, '')), //esto ultimo quita la comilla inicial y final
        ),
    );
    let SQL;

    SQL = 'INSERT IGNORE INTO technologies (technology) VALUES';
    for (const technology of technologies) {
        SQL += ` ('${technology}'),`;
    }
    SQL = SQL.slice(0, -1) + ';';
    await pool.query(SQL);

    SQL = 'INSERT IGNORE INTO themes (theme) VALUES';
    for (const theme of themes) {
        SQL += ` ('${theme}'),`;
    }
    SQL = SQL.slice(0, -1) + ';';
    await pool.query(SQL);

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
                logo,
                description,
                requirements
                )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
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
                `Id ea irure cupidatat esse esse anim aute cillum fugiat Lorem cillum qui. Nostrud dolor sint sint mollit fugiat nulla. Enim nulla irure laboris excepteur aliquip laboris fugiat eu magna. Non reprehenderit sint culpa qui. Aliqua exercitation pariatur adipisicing non. Reprehenderit excepteur enim consectetur est fugiat id sit aliqua. Excepteur ad nostrud et esse ut veniam.

Duis deserunt eiusmod consequat elit voluptate culpa qui. Mollit id anim sunt Lorem nisi tempor ut nisi proident aute Lorem. Nostrud nisi consequat excepteur nisi irure nulla eu nulla deserunt veniam officia labore nostrud sint. Id deserunt duis ut duis enim aliquip est. Adipisicing velit duis magna dolore esse consectetur aliqua officia in. Sunt ut proident aliqua tempor ea laboris ut.`,
                `Pariatur est ut ut pariatur id adipisicing mollit reprehenderit laborum. Ad est est irure veniam cillum in. Deserunt sint incididunt ad nisi consectetur irure exercitation deserunt. Aliqua esse pariatur consequat aliquip eiusmod nulla laboris ipsum proident.

Proident ex officia consectetur velit nulla enim velit consectetur cupidatat ullamco. Cillum nulla culpa incididunt magna est dolore amet duis ut aliquip ullamco adipisicing esse. Amet in proident ut eu duis non Lorem ex laboris cillum aliqua. Est magna eiusmod nostrud nostrud veniam incididunt irure minim nisi exercitation cillum quis qui tempor. Irure sit magna consectetur anim deserunt anim duis eu veniam velit Lorem adipisicing labore. Ut Lorem sint est sit aliquip aliquip velit ex sit excepteur nulla qui aliqua proident. Do commodo ullamco anim nostrud.
`,
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
