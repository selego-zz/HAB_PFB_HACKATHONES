import { useDocumentTitle } from '../../hooks/index.js'; // Importamos hooks
import { useNavigate } from 'react-router-dom';

//////

const OrganizerPromotionPage = () => {
    useDocumentTitle('Organiza tu hackathon con nosotros'); // Título de pestaña

    const navigate = useNavigate(); // Hook para la navegación

    const handleOrganizacionesClick = () => {
        navigate('NotFoundPage');
    };

    return (
        <main>
            {/* Gradiente de fondo vertical */}
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blanco to-verdeagua">
                <div className="relative z-10 flex flex-col items-center text-center sm:pt-10 max-w-xl w-full mx-4">
                    {/* Título y descripción */}
                    <div className="bg-casiblanco rounded-lg shadow-lg p-6 mb-8 w-full">
                        <h2 className="text-header-big mb-4">
                            Estás en buenas manos con Hack-a-ton.
                        </h2>
                        <p className="text-common">
                            Impulsamos hackathones desde 2009. Nuestras
                            soluciones simplifican la gestión del evento,
                            mejoran la experiencia de los participantes y
                            promueven mejores resultados comerciales.
                        </p>
                    </div>

                    {/* Sección con estadísticas */}
                    <div className="bg-casiblanco rounded-lg shadow-lg p-6 mb-8 w-full">
                        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                            <div className="flex items-center justify-center">
                                <img
                                    src="/assets/images/dev-community.jpg"
                                    alt="Comunidad de desarrolladores"
                                    className="rounded-full w-24 h-24 lg:w-32 lg:h-32 mr-4"
                                />
                                <p className="text-common">
                                    +4 millones comunidad de desarrolladores
                                </p>
                            </div>
                            <div className="flex items-center justify-center">
                                <img
                                    src="/assets/images/hackathons.jpg"
                                    alt="hackathones impulsados"
                                    className="rounded-full w-24 h-24 lg:w-32 lg:h-32 mr-4"
                                />
                                <p className="text-common">
                                    +10.000 hackathones impulsados
                                </p>
                            </div>
                            <div className="flex items-center justify-center">
                                <img
                                    src="/assets/images/experience.jpg"
                                    alt="Años de experiencia"
                                    className="rounded-full w-24 h-24 lg:w-32 lg:h-32 mr-4"
                                />
                                <p className="text-common">
                                    +14 años de experiencia en hackathones
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Texto final */}
                    <div className="bg-casiblanco rounded-lg shadow-lg p-6 mb-8 w-full">
                        <p className="text-common">
                            Únase a las empresas líderes que confían en
                            HACK-A-TON para llevar sus hackathones al siguiente
                            nivel.
                        </p>
                    </div>

                    {/* Botón para organizaciones */}
                    <div className="mt-10">
                        <button
                            onClick={handleOrganizacionesClick}
                            className="button-big-rounded-green"
                        >
                            Organiza tu hackathon
                            <span className="p-2">→</span>
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default OrganizerPromotionPage;
