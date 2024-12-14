// Importaciones
import { validateSchemaUtil } from '../../utils/index.js';
import { hackathonFilterSchema } from '../../schemas/hackathons/index.js';

import {
    getAllHackathonsModel,
    getFilteredHackathonsModel,
} from '../../models/index.js';

/////////////////////////////////////////////////////////////////
// Controlador que devuelve información de los hackathons
//
// Si body está vacío, devuelve información de todos los hackathons
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

const getAllHackathonsController = async (req, res, next) => {
    try {
        // extraemos y parseamos los filtros de los query param
        let filter = null;

        if (req.query?.data?.length > 0) {
            filter = JSON.parse(req.query.data);
        }

        if (filter) await validateSchemaUtil(hackathonFilterSchema, filter);

        let hackathons;

        if (filter) {
            hackathons = await getFilteredHackathonsModel(filter);
        } else hackathons = await getAllHackathonsModel();

        let message =
            hackathons.length > 0
                ? 'Hackatones obtenidos'
                : 'No se encontraron hackatones que cumplan los criterios de búsqueda';
        res.send({
            status: 'ok',
            message,
            data: hackathons,
        });
    } catch (err) {
        next(err);
    }
};

export default getAllHackathonsController;
