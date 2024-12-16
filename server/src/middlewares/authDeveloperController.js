import { verifyTokenController } from '../middlewares/index.js';

/////////////////////////////////////////////////////////////////
// Este middleware llama a verifyTokenController
//      le pasa a verifyTokenController el rol que queremos comprobar.
/////////////////////////////////////////////////////////////////

const authDeveloperController = async (req, res, next) => {
    await verifyTokenController(req, res, next, 'desarrollador');
};

export default authDeveloperController;
