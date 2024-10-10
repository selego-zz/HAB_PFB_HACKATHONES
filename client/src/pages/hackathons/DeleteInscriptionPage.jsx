import { useState } from 'react';
import { useDocumentTitle } from '../../hooks';

const DeleteInscriptionPage = () => {
    // Título de pestaña
    useDocumentTitle('Cancelar inscripción');

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
            <h1>Eliminar inscripción al evento de Hackathon</h1>
            {isConfirmed ? (
                <p>La inscripción ha sido cancelada.</p>
            ) : (
                <>
                    {isOpen ? (
                        <>
                            <p>
                                ¿Quieres cancelar tu inscripción al evento de
                                hackathon?
                            </p>
                            <button onClick={handleConfirm}>Confirmar</button>
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

export default DeleteInscriptionPage;
