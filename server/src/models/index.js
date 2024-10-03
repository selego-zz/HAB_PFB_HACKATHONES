import {
    addHackathonInscriptionModel,
    deleteHackathonModel,
    deleteHackathonInscriptionModel,
    getAllHackathonsModel,
    getAllInscriptionsModel,
    getEnrollmentModel,
    getFilteredHackathonsModel,
    getHackathonByIdModel,
    getHackathonOrganizerModel,
    getHackathonTechnologiesModel,
    getHackathonThemesModel,
    getOrganizerHackathonsModel,
    getUserHackathonsModel,
    addHackathonModel,
    updateHackathonModel,
    updateRatingModel,
    updateScoreModel,
} from './hackathons/index.js';

import {
    addUserModel,
    getLastAuthUpdateModel,
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
    // hackathons
    addHackathonInscriptionModel,
    deleteHackathonModel,
    deleteHackathonInscriptionModel,
    getAllHackathonsModel,
    getAllInscriptionsModel,
    getEnrollmentModel,
    getFilteredHackathonsModel,
    getHackathonByIdModel,
    getHackathonOrganizerModel,
    getHackathonTechnologiesModel,
    getHackathonThemesModel,
    getOrganizerHackathonsModel,
    getUserHackathonsModel,
    addHackathonModel,
    updateHackathonModel,
    updateRatingModel,
    updateScoreModel,

    // users
    addUserModel,
    getLastAuthUpdateModel,
    updateResetPassModel,
    selectUserByEmailModel,
    selectUserByIdModel,
    selectUserByUsernameModel,
    updateActiveUserModel,
    updatePassModel,
    updateUserModel,
};
