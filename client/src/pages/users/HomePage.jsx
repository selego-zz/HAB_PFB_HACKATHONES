import { useDocumentTitle } from '../../hooks/index.js'; // Importamos hooks
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
    useDocumentTitle('Inicio'); // Título de pestaña

    const navigate = useNavigate(); // Hook para la navegación

    const handleOrganizacionesClick = () => {
        navigate('NotFoundPage');
    };
    const handleParticipantesClick = () => {
        navigate('/hackathons');
    };

    return (
        <main>
            <div className="relative">
                <div className="lg:bg-[url('/assets/images/back-banner.jpg')] lg:bg-cover lg:bg-center lg:absolute lg:left-1/3 inset-0 z-0"></div>

                <div className="relative z-10 flex flex-col items-center justify-center lg:items-start sm:pt-10">
                    <div>
                        <h2 className="text-header-big">
                            El hogar de los hackathones.
                        </h2>
                    </div>

                    <div className="ml-10 mr-10 lg:ml-20 mt-2 lg:w-96">
                        <p className="text-common">
                            Donde las organizaciones y los desarrolladores se
                            unen para construir, inspirar e innovar.
                        </p>
                    </div>

                    <div className="flex flex-col items-center justify-center lg:items-start h-60">
                        <button
                            onClick={handleOrganizacionesClick}
                            className="button-big-rounded-green"
                        >
                            Organizaciones<span className="ml-10">→</span>
                        </button>
                        <button
                            onClick={handleParticipantesClick}
                            className="button-big-rounded-green"
                        >
                            Participantes<span className="ml-16">→</span>
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default HomePage;
