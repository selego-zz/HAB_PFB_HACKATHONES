import { useContext, useEffect, useState } from 'react';

import { useHackathons } from '../../hooks/index.js';

import { AuthContext } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { HackathonList } from '../../components';
import { useDocumentTitle } from '../../hooks/index.js';

import toast from 'react-hot-toast';
import Swal from 'sweetalert2';

const { VITE_API_UPLOADS, VITE_API_URL, VITE_APP_NAME } = import.meta.env;

////////////////

const UserProfilePage = () => {
    // Título de pestaña
    useDocumentTitle('Perfil');

    const { authUser, authToken, authLogoutState } = useContext(AuthContext);
    const [hackathons, setHackathons] = useState([]);
    const { getUsersHackathon, compareHackathons } = useHackathons();
    const [historico, setHistorico] = useState(false); //Esto es para decidir si ver el historial de hackathons o los que están activos.

    const [historicHackathons, setHistoricHackathons] = useState([]);
    const [currentHackathons, setCurrentHackathons] = useState([]);

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
                setCurrentHackathons(
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
    if (!authUser) return <h1>Loading...</h1>;
    return (
        <div className="min-h-screen bg-[url('/assets/images/back-banner.jpg')] bg-cover bg-center ">
            <div className="min-h-screen bg-blanco bg-opacity-90">
                <div className="max-w-screen mx-auto py-8 px-4 ml-5 mr-5">
                    <div className=" font-jost font-semibold text-blanco flex bg-azuloscuro rounded-xl sm:ml-7 ">
                        {authUser.avatar && (
                            <img
                                src={`${VITE_API_UPLOADS}/${authUser.avatar}`}
                                alt={`${authUser.firstName} avatar`}
                                className="w-24 h-24 rounded-full m-4 border-blanco border-4 "
                            />
                        )}
                        <div className="flex flex-col justify-center">
                            <h1 className="text-3xl w-full">
                                {authUser.firstName} {authUser.lastName} (
                                {authUser.username})
                            </h1>
                            <p> Email: {authUser.email} </p>
                            <p> Linkedin: {authUser.linkedIn} </p>
                        </div>
                    </div>

                    <div className="flex flex-col-reverse sm:flex-row-reverse sm:justify-end mt-7 sm:ml-7">
                        <div className="flex flex-col w-full sm:ml-10 mt-10 sm:mt-0">
                            <h2 className="font-jost font-semibold text-azuloscuro">
                                Biografía:
                            </h2>
                            <p className="bg-casiblanco  max-w-3xl h-40 rounded-2xl text-negro font-jost font-medium">
                                {authUser.biography}
                            </p>
                        </div>

                        <button
                            onClick={() => {
                                navigate('/users/update');
                            }}
                            className="bg-verdemarino text-azuloscuro font-jost font-semibold h-10 min-w-36  rounded-2xl hover:bg-verdeclaro "
                        >
                            Actualizar perfil
                        </button>
                    </div>

                    {/* Historial de hackathons */}

                    <div className="mt-20 flex">
                        <button
                            className="bg-verdeclaro font-jost font-semibold text-azuloscuro text-lg sm:text-xl h-10 w-56 rounded-sm hover:bg-verdemarino focus:bg-verdemarino border-l-2 border-l-azuloscuro border-r-2 border-r-azuloscuro"
                            onClick={() => {
                                setHistorico(true);
                            }}
                        >
                            Historial de hackathons
                        </button>

                        <button
                            className="bg-verdeclaro font-jost font-semibold text-azuloscuro text-lg sm:text-xl h-10 w-56 rounded-sm hover:bg-verdemarino focus:bg-verdemarino border-l-2 border-l-azuloscuro border-r-2 border-r-azuloscuro "
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
                    <div className="bg-verde2 border-verde2 border">
                        {!historico && (
                            <HackathonList hackathons={currentHackathons} />
                        )}
                    </div>

                    <div className="flex justify-center md:justify-start">
                        <button
                            onClick={handleRemoveUser}
                            className="button-angled-red mt-20"
                        >
                            Eliminar usuario
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfilePage;
