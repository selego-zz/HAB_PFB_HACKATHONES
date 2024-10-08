import { useDocumentTitle } from '../../hooks/index.js'; // Importamos hooks

//////

const HomePage = () => {
    // Título de pestaña
    useDocumentTitle('Inicio');
    return (
        <main>
            <h2 className=" text-green-500 font-bold text-3xl">Hola</h2>
            <p>¿Qué tal?</p>
        </main>
    );
};

export default HomePage;
