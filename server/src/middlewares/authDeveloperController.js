import { verifyTokenUtil } from '../utils/index.js';

/////////////////////////////////////////////////////////////////
// Este middleware llama a verifyTokenUtil
//      le pasa a verifyTokenUtil el rol que queremos comprobar.
/////////////////////////////////////////////////////////////////

const authDeveloperController = async (req, res, next) => {
    await verifyTokenUtil(req, res, next, 'desarrollador');
};

export default authDeveloperController;
