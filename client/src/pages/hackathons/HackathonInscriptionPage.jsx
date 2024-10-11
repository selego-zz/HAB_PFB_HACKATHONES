import { useState } from 'react';
import { useDocumentTitle } from '../../hooks';
import { useNavigate } from 'react-router-dom';

const HackathonInscriptionPage = () => {
    // Título de pestaña
    useDocumentTitle('Inscripción al evento');
    const navigate = useNavigate();

    const [isConfirmed, setIsConfirmed] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    
    
   
    const handleConfirm = async () => {
        try {
            const res = await fetch(`${VITE_API_URL}/hackathons/:hackathonId/registration`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: authToken,
                },
                body: JSON.stringify(hackathon),
            });
            const body = await res.json();

            if (body.status === 'error') throw new Error(body.message);
            setHackathons([]);
            return body.message;
        } catch (err) {
            throw new Error(err);
        }
    };

        
        setIsConfirmed(true);
        setIsOpen(false);
    };

    const handleCancel = () => {
        if (!isOpen) {
            navigate('/hackathons/:hackathonId');
        } else {
            setIsOpen(false);
        }
    };



    return (
        <div className="bg-[url('/assets/images/back-banner.jpg')] bg-cover bg-center ">
            <div className=" bg-blanco bg-opacity-90">
                <div className="flex items-center flex-col justify-center flex-grow h-96">
                    <div className="relative bg-gradient-to-r from-verdeclaro to-casiblanco p-6 rounded-2xl shadow-xl w-96 h-56 text-center flex justify-center items-center flex-col sm:w-2/5 sm:min-w-96">
                        <button
                            onClick={handleCancel}
                            className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-verdemarino text-negro"
                        >
                            ❎
                        </button>
                        <h2 className="text-3xl font-semibold font-jost text-azuloscuro mb-5">
                            Inscripción al Hackathon
                        </h2>
                        {isConfirmed ? (
                            <p className="font-jost font-medium text-azuloscuro">
                                ¡Gracias por confirmar tu inscripción!
                            </p>
                        ) : (
                            <>
                                {isOpen ? (
                                    <>
                                        <p className="mb-5 font-jost font-medium text-azuloscuro ">
                                            ¿Quieres inscribirte en el
                                            hackathon?
                                        </p>
                                        <button
                                            onClick={handleConfirm}
                                            className="bg-azuloscuro text-blanco px-4 py-2 rounded-lg hover:bg-verdeagua font-jost font-medium text-xl w-48"
                                        >
                                            Confirmar
                                        </button>
                                    </>
                                ) : (
                                    <button
                                        onClick={() => setIsOpen(true)}
                                        className="bg-azuloscuro text-blanco px-4 py-2 rounded-lg hover:bg-verdeagua font-jost font-medium text-xl w-48 mt-4"
                                    >
                                        Inscribirse
                                    </button>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HackathonInscriptionPage;