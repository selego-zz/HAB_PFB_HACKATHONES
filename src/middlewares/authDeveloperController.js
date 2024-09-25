import verifyTokenUtil from '../utils/index.js';

/////////////////////////////////////////////////////////////////
// Este middleware llama a verifyTokenUtil
//      le pasa a verifyTokenUtil el rol que queremos comprobar.
/////////////////////////////////////////////////////////////////
const authDeveloperController = (req, res, next) => {
    verifyTokenUtil(req, res, next, 'desarrollador');
};

export default authDeveloperController;
