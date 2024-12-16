import 'dotenv/config';
import getPool from './getPool.js';
import bcrypt from 'bcrypt';
//////

// Declaramos las tablas que generaremos.

const SQL_DROP_TABLE =
    'DROP TABLE IF EXISTS userTechnologies, hackathonTechnologies, technologies, hackathonThemes, themes, enrollsIn, hackathons, users';

const SQL_USERS_TABLE = `
    CREATE TABLE IF NOT EXISTS users(
        id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,

        username VARCHAR(50) UNIQUE,
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(100) NOT NULL,
        avatar VARCHAR(100) DEFAULT 'default-avatar.png',

        firstName VARCHAR(50) NOT NULL,
        lastName VARCHAR(50) NOT NULL,
        role ENUM ('administrador', 'organizador', 'desarrollador') NOT NULL,
        
        biography VARCHAR(900),
        linkedIn VARCHAR(100),

        recoverPassCode CHAR(30),
        activationCode CHAR(30),
        active BOOLEAN DEFAULT FALSE,

        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME,
        lastAuthUpdate DATETIME
    )`;

const SQL_HACKATHONS_TABLE = `
    CREATE TABLE IF NOT EXISTS hackathons(
        id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,

        name VARCHAR(100) UNIQUE,

        organizerId INT UNSIGNED NOT NULL,
        FOREIGN KEY (organizerId) REFERENCES users(id),

        inscriptionDate DATETIME NOT NULL,
        inscriptionEnd DATETIME NOT NULL,
        hackathonDate DATETIME NOT NULL,
        hackathonEnd DATETIME NOT NULL,

        maxParticipants INT UNSIGNED,
        online ENUM ('presencial', 'remoto') NOT NULL,
        location VARCHAR(200),
        prizes DECIMAL(9, 2),
        description VARCHAR(1200),
        requirements VARCHAR(1200),
        logo VARCHAR(100) DEFAULT 'default-hackathon-logo.svg',
        documentation VARCHAR(100),

        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME
    )`;

const SQL_ENROLLSIN_TABLE = `
    CREATE TABLE IF NOT EXISTS enrollsIn(
        id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,

        userId INT UNSIGNED NOT NULL,
        FOREIGN KEY (userId) REFERENCES users(id),

        hackathonId INT UNSIGNED NOT NULL,
        FOREIGN KEY (hackathonId) REFERENCES hackathons(id),

        inscriptionDate DATETIME NOT NULL,
        attended BOOLEAN,
        rating TINYINT UNSIGNED,
        score INT UNSIGNED DEFAULT 0,

        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME
    )`;

const SQL_THEMES_TABLE = `
    CREATE TABLE IF NOT EXISTS themes(
        id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,

        theme varchar(200) NOT NULL UNIQUE,

        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME
    )`;

const SQL_HACKATHONTHEMES_TABLE = `
    CREATE TABLE IF NOT EXISTS hackathonThemes(
        id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,

        hackathonId INT UNSIGNED,
        FOREIGN KEY (hackathonId) REFERENCES hackathons(id),

        themeId INT UNSIGNED,
        FOREIGN KEY (themeId) REFERENCES themes(id),

        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME
    )`;

const SQL_TECHNOLOGIES_TABLE = `
    CREATE TABLE IF NOT EXISTS technologies(
        id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,

        technology varchar(200) NOT NULL UNIQUE,

        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME
    )`;

const SQL_HACKATHONTECHNOLOGIES_TABLE = `
    CREATE TABLE IF NOT EXISTS hackathonTechnologies(
        id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,

        hackathonId INT UNSIGNED,
        FOREIGN KEY (hackathonId) REFERENCES hackathons(id),

        technologyId INT UNSIGNED,
        FOREIGN KEY (technologyId) REFERENCES technologies(id),

        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME
    )`;

const SQL_USERTECHNOLOGIES_TABLE = `
    CREATE TABLE IF NOT EXISTS userTechnologies(
        id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,

        userId INT UNSIGNED,
        FOREIGN KEY (userId) REFERENCES users(id),

        technologyId INT UNSIGNED,
        FOREIGN KEY (technologyId) REFERENCES technologies(id),

        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME
    )`;

const SQL_ADMIN_INSERT = `
    INSERT INTO users (username, email, password, firstname, lastname, role, active)
        VALUES (?, ?, ?, ?, ?, 'administrador', true)`;

const SQL_THEME_INSERT = `
    INSERT INTO themes (theme)
        VALUES (?)`;

const SQL_THECHNOLOGY_INSERT = `
    INSERT INTO technologies (technology)
        VALUES (?)`;

////////////////////////////////////////////////////
// Función que genera las tablas en la base de datos
// también crea el usuario administrador
// no recibe parámetros
// no devuelve nada
////////////////////////////////////////////////////
const initCommonDB = async () => {
    try {
        // Obtenemos una conexión con la base de datos.
        const pool = await getPool();

        console.log('Borrando tablas...');

        // Borramos las tablas.
        await pool.query(SQL_DROP_TABLE);

        console.log('Creando tablas...');

        console.log('Tabla users');
        await pool.query(SQL_USERS_TABLE);

        console.log('Tabla hackathons');
        await pool.query(SQL_HACKATHONS_TABLE);

        console.log('Tabla enrollsIn');
        await pool.query(SQL_ENROLLSIN_TABLE);

        console.log('Tabla themes');
        await pool.query(SQL_THEMES_TABLE);

        console.log('Tabla hackathonThemes');
        await pool.query(SQL_HACKATHONTHEMES_TABLE);

        console.log('Tabla technologies');
        await pool.query(SQL_TECHNOLOGIES_TABLE);

        console.log('Tabla hackathonsTechnologies');
        await pool.query(SQL_HACKATHONTECHNOLOGIES_TABLE);

        console.log('Tabla userTechnologies');
        await pool.query(SQL_USERTECHNOLOGIES_TABLE);

        console.log('¡Tablas creadas!');

        console.log('Insertando temas y tecnologías');

        const themes = process.env.DB_THEMES.split(',').map((theme) =>
            theme.replace(/(^")|("$)/g, ''),
        ); //esto ultimo quita la comilla inicial y final

        for (const theme of themes) {
            await pool.query(SQL_THEME_INSERT, [theme]);
        }

        const technologies = process.env.DB_TECHNOLOGIES.split(',').map(
            (technology) => technology.replace(/(^")|("$)/g, ''),
        ); //esto ultimo quita la comilla inicial y final

        for (const technology of technologies) {
            await pool.query(SQL_THECHNOLOGY_INSERT, [technology]);
        }

        console.log('Temas y Tecnologías añadidas');

        //falta añadir tecnologías y temáticas.... que diferencia hay entre una y otra? añadimos unas pocas? añadimos un montón?....
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

const initAdmin = async () => {
    // Obtenemos una conexión con la base de datos.
    const pool = await getPool();

    console.log('Insertando usuario administrador');
    await pool.query(SQL_ADMIN_INSERT, [
        process.env.ADMIN_USER_USERNAME,
        process.env.ADMIN_USER_EMAIL,
        await bcrypt.hash(process.env.ADMIN_USER_PASSWORD, 10),
        process.env.ADMIN_USER_FIRSTNAME,
        process.env.ADMIN_USER_LASTNAME,
    ]);
};

export { initCommonDB, initAdmin };
