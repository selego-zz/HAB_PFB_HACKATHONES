// Importamos los hooks
import { Routes, Route } from 'react-router-dom';

// Importamos las páginas
import {
    // Hackathons
    CreateHackathonPage,
    DeleteInscriptionPage,
    HackathonDetailsPage,
    HackathonInscriptionPage,
    HackathonListPage,
    UpdateHackathonPage,
    // Users
    DeveloperPromotionPage,
    HomePage,
    ListAllUsersPage,
    LoginPage,
    OrganizerPromotionPage,
    RecoverPass_GetCodePage,
    RecoverPass_SendCodePage,
    RegisterPage,
    UpdateUserPage,
    UserProfilePage,
    ValidationPage,
    // Otros
    AboutUs,
    NotFoundPage,
} from './pages';

// Importamos componentes
import { Header, Footer } from './components';

// Importamos otras funciones
import { Toaster } from 'react-hot-toast';

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
                    <Route path="users/login" element={<LoginPage />} />
                    <Route path="users/register" element={<RegisterPage />} />
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
                    <Route path="users/update" element={<UpdateUserPage />} />
                    <Route
                        path="org-promotion"
                        element={<OrganizerPromotionPage />}
                    />
                    <Route
                        path="dev-promotion"
                        element={<DeveloperPromotionPage />}
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
                    <Route
                        path="/hackathons/:hackathonId/update"
                        element={<UpdateHackathonPage />}
                    />

                    {/* Otros */}
                    <Route path="/aboutUs" element={<AboutUs />} />
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </section>
            <Footer />
        </section>
    );
};

export default App;
