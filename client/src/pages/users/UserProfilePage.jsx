import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';

import { useHackathons } from '../../hooks/index.js';
import { useNavigate } from 'react-router-dom';
import Rating from '../../components/Rating.jsx';
import toast from 'react-hot-toast';

const { VITE_API_UPLOADS, VITE_API_URL } = import.meta.env;

////////////////

const UserProfilePage = () => {
    const { authUser, authToken, authLogoutState } = useContext(AuthContext);
    const [hackathons, setHackathons] = useState([]);
    const { getUsersHackathon, compareHackathons } = useHackathons();
    const [historico, setHistorico] = useState(false); //Esto es para decidir si ver el historial de hackathons o los que están activos.

    const navigate = useNavigate();
    // Si no hay usuario logeado, redirigimos a home.
    if (!authUser) navigate('/');

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

    const handleRemoveUser = async () => {
        try {
            const userId = authUser.id;

            const res = await fetch(`${VITE_API_URL}/users/delete/${userId}`, {
                method: 'DELETE',
                headers: { Authorization: authToken },
            });
            const body = await res.json();
            console.log(body);
            if (body.status === 'error') throw new Error(body.message);
            authLogoutState();
            toast.success(body.message);
            navigate('/');
            console.log(body);
        } catch (err) {
            toast.error(err.message, { id: 'userprofile' });
        }
    };

    if (!authUser || !hackathons) {
        console.log(authUser);
        console.log(hackathons);
        return <div>Cargando...</div>;
    }

    return (
        <div>
            {/* Información del usuario */}
            <div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    {authUser.avatar && (
                        <img
                            src={`${VITE_API_UPLOADS}/${authUser.avatar}`}
                            alt={`${authUser.firstName} avatar`}
                            className="w-20 h-20 rounded-full mr-2"
                        />
                    )}
                    <h1>
                        {authUser.firstName} {authUser.lastName} (
                        {authUser.username})
                    </h1>
                </div>
                <p> Email: {authUser.email} </p>
                <p> Linkedin: {authUser.linkedIn} </p>
                <button className="bg-azuloscuro m-3 h-10 w-32 rounded-md text-blanco ">
                    Actualizar perfil
                </button>
            </div>
            <div>
                <h2>Biografía: </h2>
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

                                    <p>Finalizó el: {hackathon.hackathonEnd}</p>

                                    <Rating
                                        hackathonId={hackathon.hackathonId}
                                        initialRating={
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
                                    <p>Termina el: {hackathon.hackathonEnd} </p>
                                    <p> {hackathon.location} </p>

                                    <p>Premios: {hackathon.prizes}</p>
                                    <p>
                                        Límite de participantes:
                                        {hackathon.maxParticipants}
                                    </p>
                                    <button className="button-rounded-green">
                                        Eliminar inscripción
                                    </button>
                                </div>
                            );
                    })}
            </div>
            <button onClick={handleRemoveUser} className="button-angled-red">
                Eliminar Usario
            </button>
        </div>
    );
};

export default UserProfilePage;
