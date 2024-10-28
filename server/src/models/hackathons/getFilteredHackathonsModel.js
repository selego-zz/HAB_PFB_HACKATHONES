import getPool from '../../db/getPool.js';

import {
    getAllHackathonsModel,
    getHackathonTechnologiesModel,
    getHackathonThemesModel,
    getRankingModel,
} from './index.js';

/////////////////////////////////////////////////////////////////
// Modelo que devuelve información de los hackathones
//
// Si body está vacío, devuelve información de todos los hackathones
//
// Si body no está vacío, puede contener una combinación de
//       los siguientes campos, que pueden estar o no:
//       req.body.orderBy que es un array de JSON
//             los JSON tendrán 2 string:
//                   field: es el nombre del campo por el que se ordenara
//                   type: tiene 2 posibles valores: ASC o DESC
//                   corresponde a ascendente o descendente
//       req.body.themes que es un array de string de temas
//             se filtrará el resultado devolviendo solo los que
//             tengan un tema que contenga esa cadena
//       req.body.technologies que es un array de string de tecnologías
//             se filtrará el resultado devolviendo solo los que
//             tengan una tecnología que contenga esa cadena
//       el resto de los elementos de body serán los posibles
//             campos de la tabla hackathons
//             se filtrará el resultado devolviendo solo los que
//             tengan un valor que contenga ese string para ese campo
// Devuelve un array de JSON con los hackathon que cumplan los filtros
//             en el orden determinado
/////////////////////////////////////////////////////////////////

const getFilteredHackathonsModel = async (filters) => {
    if (!filters) return await getAllHackathonsModel();

    const pool = await getPool();

    //primero extraemos los arrays de filters, para poder trabajar con el json plano
    let orderBy;
    if (filters.orderBy) {
        orderBy = filters.orderBy;
        delete filters.orderBy;
    }
    let themes;
    if (filters.themes) {
        themes = filters.themes;
        delete filters.themes;
    }
    let technologies;
    if (filters.technologies) {
        technologies = filters.technologies;
        delete filters.technologies;
    }

    let maxParticipantsFrom;
    let maxParticipantsTo;
    let prizesFrom;
    let prizesTo;
    let inscriptionFrom;
    let inscriptionTo;
    let hackathonDateFrom;
    let hackathonDateTo;

    maxParticipantsFrom = filters.maxParticipantsFrom;
    delete filters.maxParticipantsFrom;

    maxParticipantsTo = filters.maxParticipantsTo;
    delete filters.maxParticipantsTo;

    prizesFrom = filters.prizesFrom;
    delete filters.prizesFrom;

    prizesTo = filters.prizesTo;
    delete filters.prizesTo;

    if (filters.inscriptionFrom) {
        inscriptionFrom = filters.inscriptionFrom;
        delete filters.inscriptionFrom;
    }
    if (filters.inscriptionTo) {
        inscriptionTo = filters.inscriptionTo;
        delete filters.inscriptionTo;
    }
    if (filters.hackathonDateFrom) {
        hackathonDateFrom = filters.hackathonDateFrom;
        delete filters.hackathonDateFrom;
    }
    if (filters.hackathonDateTo) {
        hackathonDateTo = filters.hackathonDateTo;
        delete filters.hackathonDateTo;
    }

    const camposADevolver =
        'h.id, h.name, h.logo, h.online, h.hackathonDate, h.hackathonEnd, h.location, h.updatedAt, h.description, h.requirements';

    let sqlSelect = `SELECT ${camposADevolver}, AVG(e.rating) AS average_rating`;
    let sqlFrom = ' FROM hackathons h';
    let sqlJoins = ` LEFT JOIN
                enrollsIn e ON h.id = e.hackathonId`;
    let sqlWhere = '';
    let groupBy = ' group by ' + camposADevolver;
    let sqlOrderBy = '';
    const args = [];

    // ahora tenemos 3 posibles filtros, 2 de ellos requieren un join, y un posible array de orderby
    //por cuestiones de optimización, meto el where después de construir sqlJoins (pero al principio de la cadena ^^' )
    if (themes && themes.length > 0) {
        sqlSelect += ', theme';
        groupBy += ', theme';
        sqlJoins += `
            LEFT JOIN
                hackathonThemes ht ON h.id = ht.hackathonId
            LEFT JOIN 
                themes t ON ht.themeId = t.id
        `;

        for (const theme of themes) {
            sqlWhere += ` and theme like ?`;
            args.push('%' + theme + '%');
        }
    }

    if (technologies && technologies.length > 0) {
        sqlSelect += ', technology';
        groupBy += ', technology';
        sqlJoins += `
            LEFT JOIN 
                hackathonTechnologies htech ON h.id = htech.hackathonId
            LEFT JOIN 
                technologies tech ON htech.technologyId = tech.id
        `;

        for (const technology of technologies) {
            sqlWhere += ` and technology like ?`;
            args.push('%' + technology + '%');
        }
    }

    //en este no hago comprobación, por que si no entra al for no mete nada antes
    for (const filter in filters) {
        sqlWhere += ` and ?? like ?`;
        args.push(filter);
        args.push('%' + filters[filter] + '%');
    }

    // ahora vamos con los filtros especiales:
    if (maxParticipantsFrom) {
        sqlWhere += ` and maxParticipants >= ?`;
        args.push(maxParticipantsFrom);
    }
    if (maxParticipantsTo) {
        sqlWhere += ` and maxParticipants <= ?`;
        args.push(maxParticipantsTo);
    }
    if (prizesFrom) {
        sqlWhere += ` and prizes >= ?`;
        args.push(prizesFrom);
    }
    if (prizesTo) {
        sqlWhere += ` and prizes <= ?`;
        args.push(prizesTo);
    }
    if (inscriptionFrom) {
        sqlWhere += ` and inscriptionEnd >= ?`;
        args.push(inscriptionFrom);
    }
    if (inscriptionTo) {
        sqlWhere += ` and h.inscriptionDate <= ?`;
        args.push(inscriptionTo);
    }
    if (hackathonDateFrom) {
        sqlWhere += ` and hackathonDate >= ?`;
        args.push(hackathonDateFrom);
    }
    if (hackathonDateTo) {
        sqlWhere += ` and hackathonEnd <= ?`;
        args.push(hackathonDateTo);
    }

    //si hemos metido filters, metemos where
    if (sqlWhere.length > 0) sqlWhere = ' WHERE' + sqlWhere.slice(4);

    if (orderBy && orderBy.length > 0) {
        for (const order of orderBy) {
            sqlOrderBy += ', ??';
            args.push(order);
        }
        //quitamos la coma inicial
        sqlOrderBy = ' order by ' + sqlOrderBy.slice(2);
    }

    const [res] = await pool.query(
        sqlSelect + sqlFrom + sqlJoins + sqlWhere + groupBy + sqlOrderBy,
        args,
    );

    for (const hackathon of res) {
        hackathon.ranking = await getRankingModel(hackathon.id);
        hackathon.technologies = await getHackathonTechnologiesModel(
            hackathon.id,
        );
        hackathon.themes = await getHackathonThemesModel(hackathon.id);
    }
    return res;
};

export default getFilteredHackathonsModel;
