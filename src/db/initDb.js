import 'dotenv/config';
import getPool from './getPool.js';
import bcrypt from 'bcrypt';
//////

// Declaramos las tablas que generaremos.

const SQL_DROP_TABLE =
    'DROP TABLE IF EXISTS enrollsIn, hasLabel, labels, hackathons, users';

const SQL_USERS_TABLE = `
    CREATE TABLE IF NOT EXISTS users(
        id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,

        username VARCHAR(50) UNIQUE,
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(100) NOT NULL,
        firstName VARCHAR(50),
        lastName VARCHAR(50),
        avatar VARCHAR(100),
        role ENUM ('administrador', 'organizador', 'desarrollador') NOT NULL,
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

        maxParticipants INT UNSIGNED,
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

        hackathonId INT UNSIGNED,
        FOREIGN KEY (hackathonId) REFERENCES hackathons(id),

        tagId INT UNSIGNED,
        FOREIGN KEY (tagId) REFERENCES tags(id),

        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
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
        score INT UNSIGNED,

        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
    )`;

const SQL_ADMIN_INSERT = `
    INSERT INTO users (username, email, password, role, active)
        VALUES (?, ?, ?, 'administrador', true)`;

////////////////////////////////////////////////////
// Función que genera las tablas en la base de datos
// también crea el usuario administrador
// no recibe parámetros
// no devuelve nada
////////////////////////////////////////////////////
const initDB = async () => {
    try {
        // Obtenemos una conexión con la base de datos.
        const pool = await getPool();

        console.log('Borrando tablas...');

        // Borramos las tablas.
        await pool.query(SQL_DROP_TABLE);

        console.log('Creando tablas...');

        console.log('Tabla users');
        await pool.query(SQL_USERS_TABLE);

        console.log('Tabla hackatons');
        await pool.query(SQL_HACKATHONS_TABLE);

        console.log('Tabla tags');
        await pool.query(SQL_TAGS_TABLE);

        console.log('Tabla hasTags');
        await pool.query(SQL_HASTAGS_TABLE);

        console.log('Tabla enrollsIn');
        await pool.query(SQL_ENROLLSIN_TABLE);

        console.log('¡Tablas creadas!');
        console.log('Insertando usuario administrador');
        await pool.query(SQL_ADMIN_INSERT, [
            process.env.ADMIN_USER_USERNAME,
            process.env.ADMIN_USER_EMAIL,
            await bcrypt.hash(process.env.ADMIN_USER_PASSWORD, 10),
        ]);

        //falta añadir tecnologías y temáticas.... que diferencia hay entre una y otra? añadimos unas pocas? añadimos un montón?....

        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

initDB();

export default initDB;
