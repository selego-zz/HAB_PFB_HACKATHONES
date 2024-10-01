import {
    addHackathonInscriptionModel,
    deleteHackathonModel,
    deleteHackathonInscriptionModel,
    getAllHackathonsModel,
    getAllInscriptionsModel,
    getFilteredHackathonsModel,
    getHackathonByIdModel,
    getHackathonTechnologiesModel,
    getHackathonThemesModel,
    getUserHackathonsModel,
    addHackathonModel,
    updateHackathonModel,
    updateRatingModel,
    updateScoreModel,
} from './hackathons/index.js';

import {
    addUserModel,
    updateResetPassModel,
    selectUserByEmailModel,
    selectUserByIdModel,
    selectUserByUsernameModel,
    updateActiveUserModel,
    updatePassModel,
    updateUserModel,
    addOrganizerModel,
} from './users/index.js';

////////////////////////

export {
    //hackathons
    addHackathonInscriptionModel,
    deleteHackathonModel,
    deleteHackathonInscriptionModel,
    getAllHackathonsModel,
    getAllInscriptionsModel,
    getFilteredHackathonsModel,
    getHackathonByIdModel,
    getHackathonTechnologiesModel,
    getHackathonThemesModel,
    getUserHackathonsModel,
    addHackathonModel,
    updateHackathonModel,
    updateRatingModel,
    updateScoreModel,

    //users
    addUserModel,
    updateResetPassModel,
    selectUserByEmailModel,
    selectUserByIdModel,
    selectUserByUsernameModel,
    updateActiveUserModel,
    updatePassModel,
    updateUserModel,
    addOrganizerModel,
};
