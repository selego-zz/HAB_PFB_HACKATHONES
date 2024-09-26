import { verifyTokenUtil } from '../utils/index.js';

/////////////////////////////////////////////////////////////////
// Este middleware llama a verifyTokenUtil
//      le pasa a verifyTokenUtil el rol que queremos comprobar.
/////////////////////////////////////////////////////////////////
const authUserController = (req, res, next) => {
    verifyTokenUtil(req, res, next);
};

export default authUserController;
