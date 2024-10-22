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
        if (value[1] < 1) value[1] = 1;
        setMaxParticipants(value);
    };

    const handleMaxPrizesChange = (e, value) => {
        if (value[1] < 1) value[1] = 1;
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
    };

    if (hackathonLoading) {
        return <div>Cargando...</div>;
    }

    return (
        <main>
            <div className="min-h-screen bg-[url('/assets/images/back-banner.jpg')] bg-cover bg-center">
                <div className=" bg-blanco bg-opacity-90">
                    <h2 className="text-center text-3xl font-jost font-semibold text-azuloscuro m-10">
                        EVENTOS DE HACKATHONS
                    </h2>
                    <div className="m-10 sm:m-16 flex flex-col md:grid md:grid-cols-3 gap-20">
                        {/* Sección para poner los filtros */}
                        <section className=" max-w-sm flex justify-center mt-28">
                            <ul>
                                <li className="mb-8 mt-8">
                                    <h2 className="label">online</h2>
                                    <select
                                        name="online"
                                        id="online"
                                        defaultValue={online}
                                        className="input"
                                        onChange={(e) => {
                                            setOnline(e.target.value);
                                        }}
                                    >
                                        <option value="remoto">Online</option>
                                        <option value="presencial">
                                            Presencial
                                        </option>
                                        <option value=""></option>
                                    </select>
                                </li>
                                <li className="mb-8">
                                    <h2 className="label">Localización</h2>
                                    <input
                                        type="text"
                                        id="location"
                                        value={location}
                                        className="input"
                                        onChange={(e) => {
                                            setLocation(e.target.value);
                                        }}
                                    />
                                </li>
                                <li className="mb-8">
                                    <h2 className="label">
                                        Número de participantes
                                    </h2>
                                    <Box sx={{ width: 300 }}>
                                        <Slider
                                            getAriaLabel={() =>
                                                'Número máximo de participantes'
                                            }
                                            value={maxParticipants}
                                            onChange={
                                                handleMaxParticipantsChange
                                            }
                                            valueLabelDisplay="auto"
                                            min={0}
                                            max={limMaxParticipants}
                                        />
                                    </Box>
                                </li>
                                <li className="mb-8">
                                    <h2 className="label">
                                        Importe en premios
                                    </h2>
                                    <Box sx={{ width: 300 }}>
                                        <Slider
                                            getAriaLabel={() =>
                                                'Importe máximo de premios'
                                            }
                                            value={prizes}
                                            onChange={handleMaxPrizesChange}
                                            valueLabelDisplay="auto"
                                            min={0}
                                            max={limPrizes}
                                        />
                                    </Box>
                                </li>
                                <li className="mb-8">
                                    <label className="label">
                                        Fechas de inscripción
                                    </label>
                                    <DateRangePicker
                                        hackathonDate={inscriptionDate}
                                        setHackathonDate={setInscriptionDate}
                                    />
                                </li>
                                <li>
                                    <label className="label">
                                        Fechas de hackathon
                                    </label>
                                    <DateRangePicker
                                        hackathonDate={hackathonDate}
                                        setHackathonDate={setHackathonDate}
                                    />
                                </li>
                            </ul>
                        </section>

                        <div className=" md:col-span-2">
                            <section className="flex gap-5 mb-10">
                                <input
                                    type="text"
                                    id="title"
                                    value={titleFilter}
                                    onChange={(e) =>
                                        setTitleFilter(e.target.value)
                                    }
                                    className="w-3/5 h-11 rounded-3xl shadow-md pl-10 bg-casiblanco text-azuloscuro font-jost font-medium focus:border-azuloscuro focus:outline-none focus:bg-verdeclaro focus:ring-azuloscuro focus:ring-2"
                                />
                                <button
                                    onClick={handleSearchClick}
                                    className="bg-verdeagua w-28 h-10 rounded-3xl hover:bg-azuloscuro font-jost font-semibold text-blanco text-lg "
                                >
                                    Buscar
                                </button>
                            </section>
                            <HackathonList hackathons={hackathons} />
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default HackathonListPage;
