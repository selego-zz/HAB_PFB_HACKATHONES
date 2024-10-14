import { useContext, useEffect, useState } from 'react';
import { useHackathons } from '../../hooks/index.js';
import Rating from '../../components/Rating.jsx';

import { AuthContext } from '../../contexts/AuthContext';

const UserProfilePage = () => {
    const { authUser } = useContext(AuthContext);
    const [hackathons, setHackathons] = useState([]);
    const { getUsersHackathon, compareHackathons } = useHackathons();
    const [historico, setHistorico] = useState(false); //Esto es para decidir si ver el historial de hackathons o los que están activos.

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const newHackathons = await getUsersHackathon();
                if (!compareHackathons(hackathons, newHackathons))
                    setHackathons(newHackathons);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchUserData();
    });

    if (!authUser || !hackathons) {
        console.log(authUser);
        console.log(hackathons);
        return <div>Cargando...</div>;
    }

    return (
        <div>
            {/* Información del usuario */}
            <div>
                <h1>
                    {authUser.firstName} ({authUser.userName})
                </h1>
                <button>Actualizar perfil</button>
            </div>
            <div>
                <h2>Biografía</h2>
                <p>{authUser.biography}</p>
            </div>

            {/* Historial de hackathons */}
            <div>
                <button
                    onClick={() => {
                        setHistorico(true);
                        console.log(historico);
                    }}
                >
                    Historial de hackathons
                </button>
                {historico &&
                    hackathons.map((hackathon, index) => {
                        if (new Date(hackathon.hackathonEnd) <= Date.now())
                            return (
                                <div key={index}>
                                    <h3>{hackathon.name}</h3>
                                    <p>
                                        Comienza el: {hackathon.hackathonDate}
                                    </p>
                                    <p>Premios: {hackathon.prizes}</p>
                                    <p>
                                        {hackathon.maxParticipants}{' '}
                                        Participantes como máximo
                                    </p>
                                    <Rating
                                        hackathonId={hackathon.hackathonId}
                                        rating={
                                            hackathon.rating
                                                ? hackathon.rating
                                                : 0
                                        }
                                        ranking={
                                            hackathon.score
                                                ? hackathon.score
                                                : 0
                                        }
                                    />
                                </div>
                            );
                    })}
            </div>

            {/* Hackathons Activos */}
            <div>
                <button
                    onClick={() => {
                        setHistorico(false);
                        console.log(historico);
                    }}
                >
                    Hackathons activos
                </button>
                {!historico &&
                    hackathons.map((hackathon, index) => {
                        if (new Date(hackathon.hackathonEnd) > Date.now())
                            return (
                                <div key={index}>
                                    <h3>{hackathon.name}</h3>
                                    <p>
                                        Comienza el: {hackathon.hackathonDate}
                                    </p>
                                    <p>Premios: {hackathon.prizes}</p>
                                    <p>
                                        {hackathon.maxParticipants}{' '}
                                        Participantes como máximo
                                    </p>
                                    <button className="button-rounded-green">
                                        Eliminar inscripción
                                    </button>
                                </div>
                            );
                    })}
            </div>
        </div>
    );
};

export default UserProfilePage;
