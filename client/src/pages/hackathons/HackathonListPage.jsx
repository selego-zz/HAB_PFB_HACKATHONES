import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDocumentTitle, useHackathons } from '../../hooks';

const HackathonListPage = () => {
    // Título de pestaña
    useDocumentTitle('Eventos');

    const [titleFilter, setTitleFilter] = useState('');
    const [online, setOnline] = useState('');
    const [location, setLocation] = useState('');
    const [inscriptionDate, setInscriptionDate] = useState('');
    const [inscriptionEnd, setInscriptionEnd] = useState('');
    const [maxParticipants, setMaxParticipants] = useState('');
    const [hackathonDate, setHackathonDate] = useState('');
    const [hackathonEnd, setHackathonEnd] = useState('');
    const [prizes, setPrizes] = useState('');

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

        if (online.length < 1) removeFilter('online');
        else addFilter({ online: online });

        if (location.length < 1) removeFilter('location');
        else addFilter({ location: location });

        if (maxParticipants.length < 1) removeFilter('maxParticipants');
        else
            addFilter({
                maxParticipants: maxParticipants,
            });

        if (prizes.length < 1) removeFilter('prizes');
        else addFilter({ prizes: prizes });

        if (inscriptionDate.length < 1) removeFilter('inscriptionDate');
        else
            addFilter({
                inscriptionDate: inscriptionDate,
            });

        if (inscriptionEnd.length < 1) removeFilter('inscriptionEnd');
        else
            addFilter({
                inscriptionEnd: inscriptionEnd,
            });

        if (hackathonDate.length < 1) removeFilter('hackathonDate');
        else
            addFilter({
                hackathonDate: hackathonDate,
            });

        if (hackathonEnd.length < 1) removeFilter('hackathonEnd');
        else
            addFilter({
                hackathonEnd: hackathonEnd,
            });
    };

    if (hackathonLoading) {
        return <div>Cargando...</div>;
    }

    return (
        <main className="flex">
            <section>
                <ul>
                    <li>
                        <h2>online</h2>
                        <select
                            name="online"
                            id="online"
                            defaultValue={online}
                            onChange={(e) => {
                                setOnline(e.target.value);
                            }}
                        >
                            <option value="remoto">Online</option>
                            <option value="presencial">Presencial</option>
                            <option value=""></option>
                        </select>
                    </li>
                    <li>
                        <h2>Localización</h2>
                        <input
                            type="text"
                            id="location"
                            value={location}
                            onChange={(e) => {
                                setLocation(e.target.value);
                            }}
                            className="mt-1 block w-11/12 mx-auto border-gray-300 rounded-md shadow-sm bg-verdeclaro p-2"
                        />
                    </li>
                    <li>
                        <h2>Número de participantes máximo</h2>
                        <input
                            type="number"
                            id="maxParticipants"
                            value={maxParticipants}
                            onChange={(e) => {
                                setMaxParticipants(e.target.value);
                            }}
                            className="mt-1 block w-11/12 mx-auto border-gray-300 rounded-md shadow-sm bg-verdeclaro p-2"
                        />
                    </li>
                    <li>
                        <h2>Importe en premios</h2>
                        <input
                            type="number"
                            id="prizes"
                            value={prizes}
                            onChange={(e) => {
                                setPrizes(e.target.value);
                            }}
                            className="mt-1 block w-11/12 mx-auto border-gray-300 rounded-md shadow-sm bg-verdeclaro p-2"
                        />
                    </li>
                    <li>
                        <div className="min-w-[200px]">
                            <label className="block text-sm font-medium text-gray-700 mx-2">
                                Fecha de inscripción
                            </label>
                            <input
                                type="datetime-local"
                                name="inscriptionDate"
                                value={inscriptionDate}
                                onChange={(e) => {
                                    setInscriptionDate(e.target.value);
                                }}
                                className="mt-1 block w-11/12 mx-auto border-gray-300 rounded-md shadow-sm bg-verdeclaro p-2"
                            />
                        </div>
                    </li>
                    <li>
                        <div className="min-w-[200px]">
                            <label className="block text-sm font-medium text-gray-700 mx-2">
                                Fecha de fin de inscripción
                            </label>
                            <input
                                type="datetime-local"
                                name="inscriptionEnd"
                                value={inscriptionEnd}
                                onChange={(e) => {
                                    setInscriptionEnd(e.target.value);
                                }}
                                className="mt-1 block w-11/12 mx-auto border-gray-300 rounded-md shadow-sm bg-verdeclaro p-2"
                            />
                        </div>
                    </li>
                    <li>
                        <div className="min-w-[200px]">
                            <label className="block text-sm font-medium text-gray-700 mx-2">
                                Fecha de inicio de hackathon
                            </label>
                            <input
                                type="datetime-local"
                                name="hackathonDate"
                                value={hackathonDate}
                                onChange={(e) => {
                                    setHackathonDate(e.target.value);
                                }}
                                className="mt-1 block w-11/12 mx-auto border-gray-300 rounded-md shadow-sm bg-verdeclaro p-2"
                            />
                        </div>
                    </li>
                    <li>
                        <div className="min-w-[200px]">
                            <label className="block text-sm font-medium text-gray-700 mx-2">
                                Fecha de din de hackathon
                            </label>
                            <input
                                type="datetime-local"
                                name="hackathonEnd"
                                value={hackathonEnd}
                                onChange={(e) => {
                                    setHackathonEnd(e.target.value);
                                }}
                                className="mt-1 block w-11/12 mx-auto border-gray-300 rounded-md shadow-sm bg-verdeclaro p-2"
                            />
                        </div>
                    </li>
                </ul>
            </section>

            <div className="p-8 grow">
                {/*//lo comento por que no esta en el wireframe
            <h1 className="text-2xl font-bold">Eventos de Hackatones</h1>
            */}
                <section className="flex">
                    <input
                        type="text"
                        id="title"
                        value={titleFilter}
                        onChange={(e) => setTitleFilter(e.target.value)}
                        className="mt-1 block w-11/12 mx-auto border-gray-300 rounded-md shadow-sm bg-verdeclaro p-2"
                    />
                    <button onClick={handleSearchClick}>Buscar</button>
                </section>
                <ul className="mt-4">
                    {hackathons.map((hackathon) => (
                        <li
                            key={hackathon.id}
                            className="mb-4 p-4 border rounded cursor-pointer"
                            onClick={() =>
                                navigate(`/hackathons/${hackathon.id}`)
                            }
                        >
                            <h2 className="text-xl font-semibold">
                                {hackathon.name}
                            </h2>
                            <p>
                                <strong>Fecha:</strong>{' '}
                                {hackathon.hackathonDate} -{' '}
                                {hackathon.hackathonEnd}
                            </p>
                            <p>
                                <strong>Ubicación:</strong> {hackathon.location}
                            </p>
                        </li>
                    ))}
                </ul>
            </div>
        </main>
    );
};

export default HackathonListPage;
