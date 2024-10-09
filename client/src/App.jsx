// Importamos los hooks
import { Routes, Route } from 'react-router-dom';

// Importamos los componentes
import Header from './components/Header.jsx';
import HomePage from './pages/users/HomePage.jsx';
import RegisterPage from './pages/users/RegisterPage.jsx';
import ListAllUsersPage from './pages/users/ListAllUsersPage.jsx';
import CreateHackathonPage from './pages/hackathons/CreateHackathonPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';

import PruebaPage from './pages/pruebaPage.jsx';

//Importamos otras funciones
import { Toaster } from 'react-hot-toast';
import Footer from './components/Footer.jsx';
import HackathonDetailsPage from './pages/hackathons/HackathonDetailsPage.jsx';

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
                    <Route path="users" element={<ListAllUsersPage />} />

                    <Route
                        path="/hackathons/create"
                        element={<CreateHackathonPage />}
                    />

                    {/* Hackathons */}
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
