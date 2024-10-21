import { useNavigate } from 'react-router-dom';
import { useDocumentTitle } from '../../hooks/index.js';
import { LogosCarousel } from '../../components/index.js';

//////

const DeveloperPromotionPage = () => {
    useDocumentTitle('Muestra tu talento'); // Título de pestaña

    const navigate = useNavigate();

    const handleExplorarHackathonesClick = () => {
        navigate('/hackathons');
    };

    return (
        <main>
            {/* Gradiente de fondo vertical */}
            <div className="min-h-fit flex items-center justify-center bg-gradient-to-b from-blanco to-verdeagua p-4">
                <div className="relative z-10 flex flex-col items-center text-center sm:pt-10 w-full mx-auto">
                    {/* Título y descripción */}
                    <div className="rounded-2xl shadow-xl p-8 mb-8 max-w-2xl w-auto">
                        <h2 className="text-2xl md:text-4xl font-bold mb-4">
                            Pon a prueba tus habilidades con
                            <br /> Hack-a-ton.
                        </h2>
                        <p className="text-lg md:text-xl ">
                            Desde 2009, hemos conectado a miles de
                            desarrolladores con proyectos innovadores. Participa
                            en hackathones que te ayudarán a crecer
                            profesionalmente, mejorar tus habilidades técnicas y
                            entablar valiosas conexiones en la industria.
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
                                <p className="text-xl font-semibold ">
                                    +4 millones
                                </p>
                                <p className=" text-sm">
                                    en nuestra comunidad, ¿a qué esperas para
                                    unirte?
                                </p>
                            </div>
                        </div>
                        {/* Estadística 2 */}
                        <div className="flex items-center justify-center bg-verdeclaro rounded-lg shadow-md p-6 max-w-xs w-auto">
                            <img
                                src="/assets/images/hackathons.svg"
                                alt="hackathones realizados"
                                className="rounded-full w-16 h-16 lg:w-24 lg:h-24 mr-4 shadow-md"
                            />
                            <div>
                                <p className="text-xl font-semibold ">
                                    +10.000
                                </p>
                                <p className=" text-sm">
                                    hackathones realizados, ¡y otros tantos
                                    premios repartidos!
                                </p>
                            </div>
                        </div>
                        {/* Estadística 3 */}
                        <div className="flex items-center justify-center bg-verdemarino rounded-lg shadow-md p-6 max-w-xs w-auto">
                            <img
                                src="/assets/images/experience.svg"
                                alt="Años de experiencia"
                                className="rounded-full w-16 h-16 lg:w-24 lg:h-24 mr-4 shadow-md"
                            />
                            <div>
                                <p className="text-xl font-semibold ">
                                    +14 años
                                </p>
                                <p className=" text-sm">
                                    conectando talento con oportunidades
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Texto final */}
                    <div className="bg-blanco bg-opacity-75 rounded-2xl shadow-xl p-8 mb-8 max-w-xl w-auto">
                        <p className="text-lg ">
                            Únete a nuestra comunidad de desarrolladores,
                            aprende de los mejores y pon a prueba tus
                            habilidades en un entorno competitivo y
                            colaborativo. Hack-a-ton es tu puerta de entrada a
                            proyectos emocionantes y a un futuro profesional
                            lleno de oportunidades. ¡Mira qué empresas buscan a
                            gente como tú!
                        </p>
                    </div>

                    {/* Componente LogosCarousel */}
                    <LogosCarousel />

                    {/* Botón a eventos */}

                    <div className="mt-8">
                        <button
                            onClick={handleExplorarHackathonesClick}
                            className="button-rounded-green h-fit w-fit px-10 py-2 mb-10 text-3xl"
                        >
                            Explorar Hackathones <span className="p-2">→</span>
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default DeveloperPromotionPage;
