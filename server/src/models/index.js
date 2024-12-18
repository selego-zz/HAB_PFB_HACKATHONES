import {
    addHackathonInscriptionModel,
    addHackathonModel,
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
    getMaxParticipantsModel,
    getMaxPrizeModel,
    getOrganizerHackathonsModel,
    getOwnPosition,
    getRankingModel,
    getUserHackathonsModel,
    getUsersEnrolledOnAHackathonModel,
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
    selectUserTechnologiesModel,
    updateActiveUserModel,
    updatePassModel,
    updateUserModel,
    updateUserMarkAsInactiveModel,
    updateResetPassModel,
} from './users/index.js';

////////////////////////

export {
    // hackathons
    addHackathonInscriptionModel,
    addHackathonModel,
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
    getMaxParticipantsModel,
    getMaxPrizeModel,
    getOwnPosition,
    getOrganizerHackathonsModel,
    getRankingModel,
    getUserHackathonsModel,
    getUsersEnrolledOnAHackathonModel,
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
    selectUserTechnologiesModel,
    updateActiveUserModel,
    updatePassModel,
    updateResetPassModel,
    updateUserModel,
    updateUserMarkAsInactiveModel,
};
