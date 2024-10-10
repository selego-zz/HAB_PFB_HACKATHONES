// Importamos los hooks
import { Routes, Route } from 'react-router-dom';

// Importamos los componentes
import Header from './components/Header.jsx';
import HomePage from './pages/users/HomePage.jsx';
import RegisterPage from './pages/users/RegisterPage.jsx';
import LoginPage from './pages/users/LoginPage.jsx';
import ValidationPage from './pages/users/ValidationPage.jsx';
import ListAllUsersPage from './pages/users/ListAllUsersPage.jsx';
import CreateHackathonPage from './pages/hackathons/CreateHackathonPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';

import PruebaPage from './pages/pruebaPage.jsx';

//Importamos otras funciones
import { Toaster } from 'react-hot-toast';
import Footer from './components/Footer.jsx';
import HackathonDetailsPage from './pages/hackathons/HackathonDetailsPage.jsx';
import HackathonListPage from './pages/hackathons/HackathonListPage.jsx';
import HackathonInscriptionPage from './pages/hackathons/HackathonInscriptionPage.jsx';
import DeleteInscriptionPage from './pages/hackathons/DeleteInscriptionPage.jsx';

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
                    <Route path="users" element={<ListAllUsersPage />} />

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
