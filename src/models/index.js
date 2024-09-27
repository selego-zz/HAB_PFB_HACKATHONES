import {
    addHackathonInscriptionModel,
    deleteHackathonModel,
    getAllHackathonsModel,
    getFilteredHackathonsModel,
    getHackathonByIdModel,
    getHackathonTechnologiesModel,
    getHackathonThemesModel,
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
} from './users/index.js';

////////////////////////

export {
    //hackathons
    addHackathonInscriptionModel,
    deleteHackathonModel,
    getAllHackathonsModel,
    getFilteredHackathonsModel,
    getHackathonByIdModel,
    getHackathonTechnologiesModel,
    getHackathonThemesModel,
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
};
