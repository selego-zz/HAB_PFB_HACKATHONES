import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';

import { useDocumentTitle } from '../../hooks/index.js';
import LogosCarousel from '../../components/LogosCarousel.jsx';

//////

const OrganizerPromotionPage = () => {
    useDocumentTitle('Organiza tu hackathon con nosotros'); // Título de pestaña

    const navigate = useNavigate();
    const { isOrganizer, authLoading } = useContext(AuthContext);

    const handleOrganizacionesClick = () => {
        navigate('/hackathons/create');
    };

    return (
        <main>
            {/* Gradiente de fondo vertical */}
            <div className="min-h-fit flex items-center justify-center bg-gradient-to-b from-blanco to-verdeagua p-4">
                <div className="relative z-10 flex flex-col items-center text-center sm:pt-10 w-full mx-auto">
                    {/* Título y descripción */}
                    <div className="rounded-2xl shadow-xl p-8 mb-8 max-w-2xl w-auto">
                        <h2 className="text-2xl md:text-4xl font-bold mb-4">
                            Estás en buenas manos con
                            <br /> Hack-a-ton.
                        </h2>
                        <p className="text-lg md:text-xl text-gray-600">
                            Impulsamos hackathones desde 2009. Nuestras
                            soluciones simplifican la gestión del evento,
                            mejoran la experiencia de los participantes y
                            promueven mejores resultados comerciales.
                        </p>
                    </div>

                    {/* Sección con estadísticas */}
                    <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 w-full max-w-fit flex flex-wrap justify-center gap-6">
                        {/* Estadística 1 */}
                        <div className="flex items-center justify-center bg-casiblanco rounded-lg shadow-md p-6 max-w-xs w-auto">
                            <img
                                src="/assets/images/dev-community.svg"
                                alt="Comunidad de desarrolladores"
                                className="rounded-full w-16 h-16 lg:w-24 lg:h-24 mr-4 shadow-md"
                            />
                            <div>
                                <p className="text-xl font-semibold text-gray-700">
                                    +4 millones
                                </p>
                                <p className="text-gray-500 text-sm">
                                    comunidad de desarrolladores
                                </p>
                            </div>
                        </div>
                        {/* Estadística 2 */}
                        <div className="flex items-center justify-center bg-verdeclaro rounded-lg shadow-md p-6 max-w-xs w-auto">
                            <img
                                src="/assets/images/hackathons.svg"
                                alt="hackathones impulsados"
                                className="rounded-full w-16 h-16 lg:w-24 lg:h-24 mr-4 shadow-md"
                            />
                            <div>
                                <p className="text-xl font-semibold text-gray-700">
                                    +10.000
                                </p>
                                <p className="text-gray-500 text-sm">
                                    hackathones impulsados
                                </p>
                            </div>
                        </div>
                        {/* Estadística 3 */}
                        <div className="flex items-center justify-center bg-verdeagua rounded-lg shadow-md p-6 max-w-xs w-auto">
                            <img
                                src="/assets/images/experience.svg"
                                alt="Años de experiencia"
                                className="rounded-full w-16 h-16 lg:w-24 lg:h-24 mr-4 shadow-md"
                            />
                            <div>
                                <p className="text-xl font-semibold text-gray-700">
                                    +14 años
                                </p>
                                <p className="text-gray-500 text-sm">
                                    de experiencia en hackathones
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Texto final */}
                    <div className="bg-blanco bg-opacity-75 rounded-2xl shadow-xl p-8 mb-8 max-w-xl w-auto">
                        <p className="text-lg text-gray-600">
                            Únete a las empresas líderes que confían en
                            HACK-A-TON para llevar tus hackathones al siguiente
                            nivel.
                        </p>
                    </div>

                    {/* Componente LogosCarousel */}
                    <LogosCarousel />

                    {/* Mostrar botón solo si es organizador */}
                    {!authLoading && isOrganizer() && (
                        <div className="mt-8">
                            <button
                                onClick={handleOrganizacionesClick}
                                className="button-rounded-green h-fit w-fit px-10 py-2 mb-10 text-3xl"
                            >
                                Organiza tu hackathon{' '}
                                <span className="p-2">→</span>
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
};

export default OrganizerPromotionPage;
