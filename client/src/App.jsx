// Importamos los hooks
import { Routes, Route } from 'react-router-dom';

// Importamos los componentes
import Header from './components/Header.jsx';
import HomePage from './pages/HomePage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import CreateHackathonPage from './pages/CreateHackathonPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';

import PruebaPage from './pages/pruebaPage.jsx';

//Importamos otras funciones
import { Toaster } from 'react-hot-toast';
import Footer from './components/Footer.jsx';

////////////////////////////////////////////

const App = () => {
    return (
        <section className="flex flex-col gap-4 h-screen">
            <Toaster position="top-center" toastOptions={{ duration: 3000 }} />
            <Header />
            <section className="flex-grow">
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="users/register" element={<RegisterPage />} />
                    <Route path="/prueba" element={<PruebaPage />} />
                    <Route
                        path="/hackathons/create"
                        element={<CreateHackathonPage />}
                    />
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </section>
            <Footer />
        </section>
    );
};

export default App;
