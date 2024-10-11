import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDocumentTitle, useHackathons } from '../../hooks';

const HackathonListPage = () => {
    // Título de pestaña
    useDocumentTitle('Eventos');

    const [titleFilter, setTitleFilter] = useState('');
    const navigate = useNavigate();
    const {
        hackathons,
        hackathonLoading,
        filter,
        addFilter,
        removeFilter,
        /*         //tecnologias y temas
        technologies,
        addTechnology,
        removeTechnology,
        themes,
        addTheme,
        removeTheme,
        //Consultar los ordenes, añadir nuevo orden, eliminar orden
        orderBy,
        addOrder,
        removeOrder,
 */
    } = useHackathons();

    useEffect(() => {
        if (filter.name) {
            setTitleFilter(filter.name);
        }
    }, [filter.name]);
    const handleSearchClick = async () => {
        if (titleFilter.length < 1) removeFilter('name');
        else addFilter({ name: titleFilter });
    };

    if (hackathonLoading) {
        return <div>Cargando...</div>;
    }

    return (
        <div className="p-8">
            {/*//lo comento por que no esta en el wireframe
            <h1 className="text-2xl font-bold">Eventos de Hackatones</h1>
            */}
            <input
                type="text"
                id="title"
                value={titleFilter}
                onChange={(e) => setTitleFilter(e.target.value)}
                className="mt-1 block w-11/12 mx-auto border-gray-300 rounded-md shadow-sm bg-verdeclaro p-2"
            />
            <button onClick={handleSearchClick}>Buscar</button>
            <ul className="mt-4">
                {hackathons.map((hackathon) => (
                    <li
                        key={hackathon.id}
                        className="mb-4 p-4 border rounded cursor-pointer"
                        onClick={() => navigate(`/hackathons/${hackathon.id}`)}
                    >
                        <h2 className="text-xl font-semibold">
                            {hackathon.name}
                        </h2>
                        <p>
                            <strong>Fecha:</strong> {hackathon.hackathonDate} -{' '}
                            {hackathon.hackathonEnd}
                        </p>
                        <p>
                            <strong>Ubicación:</strong> {hackathon.location}
                        </p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default HackathonListPage;
