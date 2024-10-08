import {
    addHackathonInscriptionModel,
    deleteHackathonModel,
    deleteHackathonInscriptionModel,
    getAllHackathonsModel,
    getAllInscriptionsModel,
    getAllInscriptionsFromAHackathonModel,
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
    selectAllUsersModel,
    selectPendingUsersModel,
    selectUserByEmailModel,
    selectUserByIdModel,
    selectUserByUsernameModel,
    updateActiveUserModel,
    updatePassModel,
    updateUserModel,
    updateResetPassModel,
} from './users/index.js';

////////////////////////

export {
    // hackathons
    addHackathonInscriptionModel,
    deleteHackathonModel,
    deleteHackathonInscriptionModel,
    getAllHackathonsModel,
    getAllInscriptionsModel,
    getAllInscriptionsFromAHackathonModel,
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
    selectAllUsersModel,
    selectPendingUsersModel,
    selectUserByEmailModel,
    selectUserByIdModel,
    selectUserByUsernameModel,
    updateActiveUserModel,
    updatePassModel,
    updateUserModel,
    updateResetPassModel,
};
