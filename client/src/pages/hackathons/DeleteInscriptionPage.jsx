import { useContext, useEffect, useState } from 'react';
import { useDocumentTitle } from '../../hooks';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import toast from 'react-hot-toast';

const { VITE_API_URL } = import.meta.env;

const DeleteInscriptionPage = () => {
    // Título de pestaña
    useDocumentTitle('Cancelar inscripción');

    const { hackathonId } = useParams();
    const { authToken } = useContext(AuthContext);
    const navigate = useNavigate();

    const [isConfirmed, setIsConfirmed] = useState(false);
    const [isCancellable, setIsCancellable] = useState(true);
    const [hoursRemaining, setHoursRemaining] = useState(null);

    useEffect(() => {
        const checkCancellable = async () => {
            try {
                const res = await fetch(
                    `${VITE_API_URL}/hackathons/${hackathonId}`,
                    {
                        headers: {
                            Authorization: authToken,
                        },
                    },
                );

                const hackathon = await res.json();

                const hackathonStart = new Date(hackathon.hackathonDate);
                const now = new Date();
                const hoursLeft = (hackathonStart - now) / 36e5;
                setHoursRemaining(hoursLeft);

                if (hoursLeft < import.meta.env.VITE_MAX_CANCELLATION_HOURS) {
                    setIsCancellable(false);
                }
            } catch (err) {
                toast.error(err.message);
            }
        };

        checkCancellable();
    }, [hackathonId, authToken]);

    const handleConfirm = async () => {
        try {
            const res = await fetch(
                `${VITE_API_URL}/hackathons/${hackathonId}/cancel`,
                {
                    method: 'DELETE',
                    headers: {
                        Authorization: authToken,
                    },
                },
            );
            const body = await res.json();

            if (body.status === 'error') throw new Error(body.message);
            toast.success(body.message);

            setIsConfirmed(true);
            setTimeout(() => {
                navigate(`/hackathons/${hackathonId}`);
            }, 3000);
        } catch (err) {
            toast.error(err.message);
        }
    };

    const handleCancel = () => {
        navigate(`/hackathons/${hackathonId}`);
    };

    return (
        <div className="h-screen bg-[url('/assets/images/back-banner.jpg')] bg-cover bg-center ">
            <div className="h-full bg-blanco bg-opacity-90 flex items-center flex-col justify-center">
                <div className="relative bg-gradient-to-r from-verdeclaro to-casiblanco p-6 rounded-2xl shadow-xl w-96 h-56 text-center flex justify-center items-center flex-col sm:w-2/5 sm:min-w-96">
                    <button
                        onClick={handleCancel}
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-verdemarino text-negro"
                    >
                        ❎
                    </button>
                    <h2 className="text-3xl font-semibold font-jost text-azuloscuro mb-5">
                        Cancelar inscripción
                    </h2>
                    {isConfirmed ? (
                        <p className="font-jost font-medium text-azuloscuro">
                            La inscripción ha sido cancelada. Redirigiendo...
                        </p>
                    ) : (
                        <>
                            {isCancellable ? (
                                <p className="mb-4 font-jost font-medium text-azuloscuro">
                                    ¿Quieres cancelar la inscripción al evento?
                                </p>
                            ) : (
                                <p className="mb-4 font-jost font-medium text-rojo ">
                                    No se puede cancelar la inscripción, faltan
                                    menos de{' '}
                                    {
                                        import.meta.env
                                            .VITE_MAX_CANCELLATION_HOURS
                                    }{' '}
                                    horas para el evento. Quedan{' '}
                                    {hoursRemaining.toFixed(2)} horas.
                                </p>
                            )}
                            <button
                                onClick={handleConfirm}
                                className="bg-azuloscuro text-blanco px-4 py-2 rounded-lg hover:bg-verdeagua font-jost font-medium text-xl w-48"
                            >
                                Confirmar
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DeleteInscriptionPage;
