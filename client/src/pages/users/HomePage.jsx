import { useDocumentTitle } from '../../hooks/index.js'; // Importamos hooks
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
    useDocumentTitle('Inicio'); // Título de pestaña

    const navigate = useNavigate(); // Hook para la navegación

    const handleOrganizacionesClick = () => {
        navigate('NotFoundPage');
    };
    const handleParticipantesClick = () => {
        navigate('NotFoundPage');
    };

    return (
        <main>
            <div className="hidden sm:block">
                <h1 className="bg-azuloscuro h-32 font-semibold text-4xl text-blanco font-jost flex justify-center items-center p-10 text-center">
                    Participa en los mejores hackathones en línea y
                    presenciales.
                </h1>
            </div>

            {/* Sección ajustada con imagen ocupando todo el alto hasta el footer */}
            <div className="relative h-screen">
                {' '}
                {/* Cambiado a h-screen para ocupar toda la altura */}
                <div className="bg-[url('/assets/images/back-banner.jpg')] bg-cover bg-center sm:absolute sm:left-1/3 sm:top-0 sm:w-2/3 h-full"></div>
                <div className="bg-opacity-0 sm:w-1/2 sm:pr-10 relative z-10">
                    {' '}
                    {/* Añadido z-10 para estar por encima de la imagen */}
                    <div className="flex flex-col items-center justify-center p-3 sm:items-start sm:pt-20">
                        <h2 className="font-semibold text-3xl font-jost sm:pl-20 mt-10 sm:mt-0">
                            El hogar de los hackathones.
                        </h2>
                    </div>
                    <div className="flex flex-col items-center justify-center sm:items-start ml-10 mr-10 sm:ml-24 sm:w-2/3">
                        <p className="font-jost font-medium text-center sm:text-left">
                            Donde las organizaciones y los desarrolladores se
                            unen para construir, inspirar e innovar.
                        </p>
                    </div>
                    <div className="flex flex-col items-center justify-center sm:items-start h-60">
                        <button
                            onClick={handleOrganizacionesClick}
                            className="bg-verdemarino text-azuloscuro font-semibold font-jost h-12 w-72 rounded-3xl mt-10 text-2xl sm:ml-32 transition duration-100 hover:bg-azuloscuro hover:text-blanco"
                        >
                            Organizaciones<span className="ml-10">→</span>
                        </button>
                        <button
                            onClick={handleParticipantesClick}
                            className="bg-verdemarino text-azuloscuro font-semibold font-jost h-12 w-72 rounded-3xl mt-10 mb-10 text-2xl sm:ml-32 transition duration-100 hover:bg-azuloscuro hover:text-blanco"
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
