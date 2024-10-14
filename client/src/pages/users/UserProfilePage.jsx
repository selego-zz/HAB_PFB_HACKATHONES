import { useContext, useEffect, useState } from 'react';
import { useHackathons } from '../../hooks/index.js';

import { AuthContext } from '../../contexts/AuthContext';

const UserProfilePage = () => {
    const { authUser } = useContext(AuthContext);
    const [hackathons, setHackathons] = useState([]);
    const { getUsersHackathon } = useHackathons();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                setHackathons(await getUsersHackathon());
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
                <h1>{authUser.firstName} (Cuenta)</h1>
                <button>Actualizar perfil</button>
            </div>
            <div>
                <h2>Biografía</h2>
                <p>{authUser.biography}</p>
            </div>

            {/* Hackathons activos */}
            <div>
                <h2>Hackathons activos</h2>
                {hackathons.map((hackathon, index) => (
                    <div key={index}>
                        <h3>{hackathon.name}</h3>
                        <p>Faltan {hackathon.remainingTime} días</p>
                        <p>Premios: {hackathon.prizes}</p>
                        <p>{hackathon.maxParticipants} participantes</p>
                        <div>
                            {hackathon.technologies.map((technology, idx) => (
                                <span key={idx}>{technology}</span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UserProfilePage;
