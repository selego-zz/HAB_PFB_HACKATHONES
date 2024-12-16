import { verifyTokenController } from '../middlewares/index.js';

/////////////////////////////////////////////////////////////////
// Este middleware llama a verifyTokenController
//      le pasa a verifyTokenController el rol que queremos comprobar.
/////////////////////////////////////////////////////////////////

const authAdminController = async (req, res, next) => {
    await verifyTokenController(req, res, next, 'administrador');
};

export default authAdminController;
