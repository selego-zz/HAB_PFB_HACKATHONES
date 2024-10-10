import { useState } from 'react';
import { useDocumentTitle } from '../../hooks';

const HackathonInscriptionPage = () => {
    // Título de pestaña
    useDocumentTitle('Inscripción al evento');

    const [isConfirmed, setIsConfirmed] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const handleConfirm = () => {
        setIsConfirmed(true);
        setIsOpen(false);
    };

    const handleCancel = () => {
        setIsOpen(false);
    };

    return (
        <div>
            <h1>Inscripción al Hackathon</h1>
            {isConfirmed ? (
                <p>¡Gracias por confirmar tu inscripción!</p>
            ) : (
                <>
                    {isOpen ? (
                        <>
                            <p>¿Quieres inscribirte en el hackathon?</p>
                            <button onClick={handleConfirm}>
                                Confirmar Inscripción
                            </button>
                            <button
                                onClick={handleCancel}
                                style={{ marginLeft: '10px' }}
                            >
                                ❌ Cancelar
                            </button>
                        </>
                    ) : (
                        <button onClick={() => setIsOpen(true)}>
                            Inscribirse
                        </button>
                    )}
                </>
            )}
        </div>
    );
};

export default HackathonInscriptionPage;
