import { useEffect, useState } from 'react';

import { useDocumentTitle, useHackathons } from '../../hooks';

import { HackathonList, DateRangePicker } from '../../components';

//slider
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

const HackathonListPage = () => {
    // Título de pestaña
    useDocumentTitle('Eventos');

    const {
        hackathons,
        hackathonLoading,
        filter,
        setFilters,
        getMaxParticipants,
        getMaxPrize,
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

    const [titleFilter, setTitleFilter] = useState('');
    const [online, setOnline] = useState('');
    const [location, setLocation] = useState('');

    const [prizes, setPrizes] = useState([0, 0]);
    const [limPrizes, setLimPrizes] = useState(0);
    const [maxParticipants, setMaxParticipants] = useState([0, 0]);
    const [limMaxParticipants, setLimMaxParticipants] = useState(0);

    const [inscriptionDate, setInscriptionDate] = useState([]);
    const [hackathonDate, setHackathonDate] = useState([]);

    useEffect(() => {
        if (filter.name) {
            setTitleFilter(filter.name);
        }
    }, [filter.name]);

    useEffect(() => {
        const participants = async () => {
            const tempParticipants = parseInt(await getMaxParticipants());
            if (tempParticipants === 0) return;

            if (limMaxParticipants === tempParticipants) return;

            setLimMaxParticipants(tempParticipants);
            setMaxParticipants([0, tempParticipants]);
        };
        participants();
    }, [limMaxParticipants, getMaxParticipants]);

    useEffect(() => {
        const Prizes = async () => {
            const tempPrizes = parseInt(await getMaxPrize());
            if (tempPrizes === 0) return;

            if (limPrizes === tempPrizes) return;
            setLimPrizes(tempPrizes);
            setPrizes([0, tempPrizes]);
        };
        Prizes();
    }, [limPrizes, getMaxPrize]);

    const handleMaxParticipantsChange = (e, value) => {
        setMaxParticipants(value);
    };

    const handleMaxPrizesChange = (e, value) => {
        setPrizes(value);
    };

    const handleSearchClick = async () => {
        const filters = {};
        if (titleFilter.length > 1) filters.name = titleFilter;

        if (online.length > 1) filters.online = online;

        if (location.length > 1) filters.location = location;

        //if (maxParticipants[0].length > 1)
        filters.maxParticipantsFrom = maxParticipants[0];

        //if (maxParticipants[1].length > 1)
        filters.maxParticipantsTo = maxParticipants[1];

        //if (prizes[0].length > 1)
        filters.prizesFrom = prizes[0];

        ///if (prizes[1].length > 1)
        filters.prizesTo = prizes[1];

        if (inscriptionDate.length > 1) {
            const inscriptionFrom = inscriptionDate[0];
            let inscriptionTo =
                inscriptionDate.length > 1
                    ? inscriptionDate[1]
                    : inscriptionDate[0];
            filters.inscriptionFrom = inscriptionFrom;
            filters.inscriptionTo = inscriptionTo;
        }

        if (hackathonDate.length > 1) {
            const hackathonDateFrom = hackathonDate[0];
            let hackathonDateTo =
                hackathonDate.length > 1 ? hackathonDate[1] : hackathonDate[0];
            filters.hackathonDateFrom = hackathonDateFrom;
            filters.hackathonDateTo = hackathonDateTo;
        }
        setFilters(filters);
        console.log(maxParticipants);
        console.log(prizes);
        console.log(filters);
    };

    if (hackathonLoading) {
        return <div>Cargando...</div>;
    }

    return (
        <main className="flex">
            {/* Sección para poner los filtros */}
            <section>
                <ul className="p-4">
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
                            className="input-box"
                        />
                    </li>
                    <li>
                        <h2>Número de participantes</h2>
                        <Box sx={{ width: 300 }}>
                            <Slider
                                getAriaLabel={() =>
                                    'Número máximo de participantes'
                                }
                                value={maxParticipants}
                                onChange={handleMaxParticipantsChange}
                                valueLabelDisplay="auto"
                                min={0}
                                max={limMaxParticipants}
                            />
                        </Box>

                        {/*
                        <section className="participantes flex">
                            <section className="desde">
                                <label htmlFor="maxParticipantsFrom">
                                    Desde
                                </label>
                                <input
                                    className="semi-input-box"
                                    type="number"
                                    id="maxParticipantsFrom"
                                    value={maxParticipantsFrom}
                                    onChange={(e) => {
                                        setMaxParticipantsFrom(e.target.value);
                                    }}
                                />
                            </section>
                            <section className="hasta">
                                <label htmlFor="maxParticipantsTo">Hasta</label>
                                <input
                                    className="semi-input-box"
                                    type="number"
                                    id="maxParticipantsTo"
                                    value={maxParticipantsTo}
                                    onChange={(e) => {
                                        setMaxParticipantsTo(e.target.value);
                                    }}
                                />
                            </section>
                        </section>
                        */}
                    </li>
                    <li>
                        <h2>Importe en premios</h2>
                        <Box sx={{ width: 300 }}>
                            <Slider
                                getAriaLabel={() => 'Importe máximo de premios'}
                                value={prizes}
                                onChange={handleMaxPrizesChange}
                                valueLabelDisplay="auto"
                                min={0}
                                max={limPrizes}
                            />
                        </Box>
                        {/*
                        <section className="participantes flex">
                            <section className="desde">
                                <label htmlFor="prizesFrom">Desde</label>
                                <input
                                    className="semi-input-box"
                                    type="number"
                                    id="prizesFrom"
                                    value={prizesFrom}
                                    onChange={(e) => {
                                        setPrizesFrom(e.target.value);
                                    }}
                                />
                            </section>
                            <section className="hasta">
                                <label htmlFor="prizesTo">Hasta</label>
                                <input
                                    className="semi-input-box"
                                    type="number"
                                    id="prizesTo"
                                    value={prizesTo}
                                    onChange={(e) => {
                                        setPrizesTo(e.target.value);
                                    }}
                                />
                            </section>
                        </section>
                        */}
                    </li>
                    <li>
                        <div className="min-w-[200px]">
                            <label>Fechas de inscripción</label>
                            <DateRangePicker
                                hackathonDate={inscriptionDate}
                                setHackathonDate={setInscriptionDate}
                            />
                        </div>
                    </li>
                    <li>
                        <div className="min-w-[200px]">
                            <label>Fechas de hackathon</label>
                            <DateRangePicker
                                hackathonDate={hackathonDate}
                                setHackathonDate={setHackathonDate}
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
                        className="mt-1 block w-11/12 mx-auto rounded-md shadow-sm bg-verdeclaro p-2"
                    />
                    <button onClick={handleSearchClick}>Buscar</button>
                </section>
                <HackathonList hackathons={hackathons} />
            </div>
        </main>
    );
};

export default HackathonListPage;
