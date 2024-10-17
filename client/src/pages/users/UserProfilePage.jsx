import { useContext, useEffect, useState } from 'react';

import { useHackathons } from '../../hooks/index.js';

import { AuthContext } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import HackathonList from '../../components/HackathonList.jsx';

import toast from 'react-hot-toast';
import Swal from 'sweetalert2';

const { VITE_API_UPLOADS, VITE_API_URL, VITE_APP_NAME } = import.meta.env;

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
            // Confirmación con sweetalert2.
            const result = await Swal.fire({
                title: '¿Estás seguro de que quieres eliminar tu cuenta?',
                text: 'No podrás revertir esta acción.',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#FF3333',
                cancelButtonColor: '#22577A',
                confirmButtonText: 'Sí, quiero eliminar mi cuenta',
                cancelButtonText: 'No, me quedo',
            });

            // Si el usuario confirma, procedemos con la eliminación.
            if (result.isConfirmed) {
                const userId = authUser.id;

                const res = await fetch(
                    `${VITE_API_URL}/users/delete/${userId}`,
                    {
                        method: 'DELETE',
                        headers: { Authorization: authToken },
                    },
                );
                const body = await res.json();

                if (body.status === 'error') throw new Error(body.message);

                // Mostramos confirmación de eliminación con SweetAlert
                await Swal.fire({
                    title: 'Cuenta eliminada',
                    text: `Gracias por tu paso por ${VITE_APP_NAME}, esperamos verte de nuevo.`,
                    icon: 'success',
                });

                authLogoutState();
                toast.success(body.message);
                navigate('/');
            }
        } catch (err) {
            toast.error(err.message, { id: 'userprofile' });
        }
    };

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
            </div>
            <div>
                <h2>Biografía: </h2>
                <p>{authUser.biography}</p>
            </div>
            <button
                onClick={() => {
                    navigate('/users/update');
                }}
                className="bg-azuloscuro m-3 h-10 w-32 rounded-md text-blanco "
            >
                Actualizar perfil
            </button>

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
                Eliminar usuario
            </button>
        </div>
    );
};

export default UserProfilePage;
