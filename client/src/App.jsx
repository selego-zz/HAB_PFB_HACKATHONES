// Importamos los hooks
import { Routes, Route } from 'react-router-dom';

// Importamos los componentes
import Header from './components/Header.jsx';
import HomePage from './pages/users/HomePage.jsx';
import RegisterPage from './pages/users/RegisterPage.jsx';
import LoginPage from './pages/users/LoginPage.jsx';
import ValidationPage from './pages/users/ValidationPage.jsx';
import RecoverPass_GetCodePage from './pages/users/RecoverPass_GetCodePage.jsx';
import RecoverPass_SendCodePage from './pages/users/RecoverPass_SendCodePage.jsx';
import ListAllUsersPage from './pages/users/ListAllUsersPage.jsx';
import OrganizerPromotionPage from './pages/users/OrganizerPromotionPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';

import PruebaPage from './pages/pruebaPage.jsx';

//Importamos otras funciones
import { Toaster } from 'react-hot-toast';
import Footer from './components/Footer.jsx';
import HackathonDetailsPage from './pages/hackathons/HackathonDetailsPage.jsx';
import HackathonListPage from './pages/hackathons/HackathonListPage.jsx';
import CreateHackathonPage from './pages/hackathons/CreateHackathonPage.jsx';
import HackathonInscriptionPage from './pages/hackathons/HackathonInscriptionPage.jsx';
import DeleteInscriptionPage from './pages/hackathons/DeleteInscriptionPage.jsx';
import UserProfilePage from './pages/users/UserProfilePage.jsx';

////////////////////////////////////////////

const App = () => {
    return (
        <section className="flex flex-col gap-4 min-h-screen">
            <Toaster position="top-center" toastOptions={{ duration: 3000 }} />
            <Header />
            <section className="flex-grow">
                <Routes>
                    {/* Usuarios */}
                    <Route path="/" element={<HomePage />} />
                    <Route path="users/register" element={<RegisterPage />} />
                    <Route path="users/login" element={<LoginPage />} />
                    <Route
                        path="users/register/validate/:activationCode"
                        element={<ValidationPage />}
                    />
                    <Route
                        path="users/recover"
                        element={<RecoverPass_SendCodePage />}
                    />
                    <Route
                        path="users/recover/:recoverPassCode"
                        element={<RecoverPass_GetCodePage />}
                    />
                    <Route path="users" element={<ListAllUsersPage />} />
                    <Route
                        path="promotion"
                        element={<OrganizerPromotionPage />}
                    />
                    <Route
                        path="users/getAllUsers"
                        element={<ListAllUsersPage />}
                    />

                    <Route path="users" element={<UserProfilePage />} />

                    {/* Hackathons */}
                    <Route
                        path="/hackathons/create"
                        element={<CreateHackathonPage />}
                    />
                    <Route
                        path="/hackathons/:hackathonId/cancel"
                        element={<DeleteInscriptionPage />}
                    />
                    <Route
                        path="/hackathons/:hackathonId/registration"
                        element={<HackathonInscriptionPage />}
                    />
                    <Route path="/hackathons" element={<HackathonListPage />} />
                    <Route
                        path="/hackathons/:hackathonId"
                        element={<HackathonDetailsPage />}
                    />
                    <Route path="*" element={<NotFoundPage />} />
                    <Route path="/prueba" element={<PruebaPage />} />
                </Routes>
            </section>
            <Footer />
        </section>
    );
};

export default App;
