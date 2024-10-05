import { verifyTokenUtil } from '../utils/index.js';

/////////////////////////////////////////////////////////////////
// Este middleware llama a verifyTokenUtil
//      le pasa a verifyTokenUtil el rol que queremos comprobar.
/////////////////////////////////////////////////////////////////

const authOrganizerController = async (req, res, next) => {
    await verifyTokenUtil(req, res, next, 'organizador');
};

export default authOrganizerController;
