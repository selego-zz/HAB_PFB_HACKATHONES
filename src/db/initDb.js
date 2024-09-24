import 'dotenv/config';

import getPool from './getPool.js';

const SQL_DROP_TABLE =
    'DROP TABLE IF EXISTS enrollsOn, hasLabel, labels, hackathons, users';

const SQL_USERS_TABLE = `
    CREATE TABLE IF NOT EXISTS users(
        id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,

        username VARCHAR(50) UNIQUE,
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(100) NOT NULL,
        firstName VARCHAR(50),
        lastName VARCHAR(50),
        avatar VARCHAR(100),
        role ENUM ('organizador', 'desarrollador') NOT NULL,
        recoverPassCode CHAR(30),
        activationCode CHAR(30),
        active BOOLEAN DEFAULT FALSE,

        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
    )`;

const SQL_HACKATHONS_TABLE = `
    CREATE TABLE IF NOT EXISTS hackathons(
        id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,

        organizerId INT UNSIGNED NOT NULL,
        FOREIGN KEY (organizerId) REFERENCES users(id),

        inscriptionDate DATETIME NOT NULL,
        inscriptionEnd DATETIME NOT NULL,
        date DATETIME NOT NULL,
        end DATETIME NOT NULL,

        maxParticipants UNSIGNED INT,
        prices DECIMAL(9, 2),
        logo VARCHAR(100),
        online BOOLEAN DEFAULT TRUE,
        location VARCHAR(200),
        documentation VARCHAR(100),

        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
    )`;

const SQL_TAGS_TABLE = `
    CREATE TABLE IF NOT EXISTS tags(
        id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,

        label varchar(100) NOT NULL,

        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
    )`;

const SQL_HASTAGS_TABLE = `
    CREATE TABLE IF NOT EXISTS hastags(
        id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,

        userId INT UNSIGNED,
        FOREIGN KEY (userId) REFERENCES users(id),

        hackathoneId INT UNSIGNED,
        FOREIGN KEY (hackathonId) REFERENCES hackathons(id),

        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
    )`;

const SQL_ENROLLSON_TABLE = `
    CREATE TABLE IF NOT EXISTS enrollsOn(
        id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,

        userId INT UNSIGNED NOT NULL,
        FOREIGN KEY (userId) REFERENCES users(id),

        hackathoneId INT UNSIGNED NOT NULL,
        FOREIGN KEY (hackathonId) REFERENCES hackathons(id),

        date DATETIME NOT NULL,
        rating TINYINT UNSIGNED,
        score INT UNSIGNED,

        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
    )`;

const initDB = async () => {
    try {
        // Obtenemos una conexión con la base de datos.
        const pool = await getPool();

        console.log('Borrando tablas...');

        // Borramos las tablas.
        pool.query(SQL_DROP_TABLE);

        console.log('Creando tablas...');
        pool.query(SQL_USERS_TABLE);
        pool.query(SQL_HACKATHONS_TABLE);
        pool.query(SQL_TAGS_TABLE);
        pool.query(SQL_HASTAGS_TABLE);
        pool.query(SQL_ENROLLSON_TABLE);

        console.log('Tablas creadas!');

        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};
export default initDB;
