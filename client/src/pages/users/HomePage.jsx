import { useDocumentTitle } from '../../hooks/index.js'; // Importamos hooks
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
    useDocumentTitle('Inicio'); // Título de pestaña

    const navigate = useNavigate(); // Hook para la navegación

    const handleOrganizacionesClick = () => {
        navigate('/org-promotion');
    };
    const handleParticipantesClick = () => {
        navigate('/dev-promotion');
    };

    return (
        <main>
            <div className="relative">
                <div className="absolute bg-[url('/assets/images/back-banner.jpg')] lg:bg-[url('/assets/images/back-banner.jpg')] bg-cover bg-center lg:left-1/3 inset-0 z-0 min-h-screen"></div>

                <div className="absolute inset-0 z-10 bg-blanco opacity-80 lg:opacity-0"></div>

                <div className="relative z-20 min-h-screen flex flex-col items-center lg:items-start sm:pt-10 lg:ml-8">
                    <h2 className="text-header-big mt-24 lg:mt-14 text-center mx-10">
                        El hogar de los hackathons.
                    </h2>

                    <p className="text-common m-10 lg:ml-20 lg:w-96">
                        Donde las organizaciones y los desarrolladores se unen
                        para construir, inspirar e innovar.
                    </p>

                    <button
                        onClick={handleOrganizacionesClick}
                        className="button-big-rounded-green"
                    >
                        Para organizadores<span className="ml-3">→</span>
                    </button>
                    <button
                        onClick={handleParticipantesClick}
                        className="button-big-rounded-green"
                    >
                        Para participantes<span className="ml-4">→</span>
                    </button>
                </div>
            </div>
        </main>
    );
};

export default HomePage;
