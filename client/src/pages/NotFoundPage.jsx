import { useDocumentTitle } from '../hooks/index.js'; // Importamos hooks

//////

const NotFoundPage = () => {
    // Título de pestaña
    useDocumentTitle('¡Ups!');
    return <h2>Página no encontrada.</h2>;
};

export default NotFoundPage;
