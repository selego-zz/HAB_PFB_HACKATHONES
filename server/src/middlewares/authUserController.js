import { verifyTokenController } from '../middlewares/index.js';

/////////////////////////////////////////////////////////////////
// Este middleware llama a verifyTokenController
//      le pasa a verifyTokenController el rol que queremos comprobar.
/////////////////////////////////////////////////////////////////

const authUserController = async (req, res, next) => {
    await verifyTokenController(req, res, next);
};

export default authUserController;
