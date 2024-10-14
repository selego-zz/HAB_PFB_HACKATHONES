import { useDocumentTitle } from '../hooks/index.js'; // Importamos hooks
import { useNavigate } from 'react-router-dom'; // Para navegar de vuelta

const NotFoundPage = () => {
    // Título de pestaña
    useDocumentTitle('¡Ups!');

    const navigate = useNavigate();

    // Función para regresar a la página principal
    const goHome = () => {
        navigate('/');
    };

    return (
        <main className="flex items-center justify-center min-h-fit text-center p-6">
            <div className="p-8 rounded-lg bg-azuloscuro shadow-2xl max-w-lg mx-auto">
                <h1 className="text-6xl font-bold text-rojoclaro mb-4">404</h1>
                <p className="text-xl mb-4 text-blanco">
                    ¡Ups! No hemos encontrado la página que buscas.
                </p>
                <div className="overflow-auto mb-6">
                    <p className="text-left bg-amarillo rounded-lg p-4">
                        <code>
                            {`function notFound() {
    console.log("Esta página no existe...");
    return "404 - Page Not Found";
}

notFound();`}
                        </code>
                    </p>
                </div>
                <button
                    onClick={goHome}
                    className="bg-azuloscuro text-blanco hover:bg-amarillo hover:text-negro text-xl font-semibold py-2 px-6 rounded-full transition duration-300"
                >
                    Regresar a Inicio
                </button>
            </div>
        </main>
    );
};

export default NotFoundPage;
