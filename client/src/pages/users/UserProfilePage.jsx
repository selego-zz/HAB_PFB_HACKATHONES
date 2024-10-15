import { useContext, useEffect, useState } from 'react';

import { useHackathons } from '../../hooks/index.js';

import { AuthContext } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import HackathonList from '../../components/HackathonList.jsx';

import toast from 'react-hot-toast';

const { VITE_API_UPLOADS, VITE_API_URL } = import.meta.env;

////////////////

const UserProfilePage = () => {
    const { authUser, authToken, authLogoutState } = useContext(AuthContext);
    const [hackathons, setHackathons] = useState([]);
    const { getUsersHackathon, compareHackathons } = useHackathons();
    const [historico, setHistorico] = useState(false); //Esto es para decidir si ver el historial de hackathons o los que están activos.

    const [historicHackathons, setHistoricHackathons] = useState([]);
    const [actualHackathons, setActualHackathons] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const newHackathons = await getUsersHackathon();

                if (compareHackathons(hackathons, newHackathons)) return;

                setHackathons(newHackathons);

                setHistoricHackathons(
                    newHackathons.filter(
                        (hackathon) =>
                            new Date(hackathon.hackathonEnd) <= Date.now(),
                    ),
                );
                setActualHackathons(
                    newHackathons.filter(
                        (hackathon) =>
                            new Date(hackathon.hackathonEnd) > Date.now(),
                    ),
                );
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        // Si no hay usuario logeado, redirigimos a home.
        if (!authUser) navigate('/');

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

            if (body.status === 'error') throw new Error(body.message);
            authLogoutState();
            toast.success(body.message);
            navigate('/');
        } catch (err) {
            toast.error(err.message, { id: 'userprofile' });
        }
    };

    if (!authUser || !hackathons) {
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
                    className="button-angled-green"
                    onClick={() => {
                        setHistorico(true);
                    }}
                >
                    Historial de hackathons
                </button>

                <button
                    className="button-angled-green"
                    onClick={() => {
                        setHistorico(false);
                    }}
                >
                    Hackathons activos
                </button>
            </div>

            <div>
                {historico && (
                    <HackathonList
                        hackathons={historicHackathons}
                        showRating={true}
                    />
                )}
            </div>

            {/* Hackathons Activos */}
            <div>
                {!historico && <HackathonList hackathons={actualHackathons} />}
            </div>
            <button onClick={handleRemoveUser} className="button-angled-red">
                Eliminar Usuario
            </button>
        </div>
    );
};

export default UserProfilePage;
