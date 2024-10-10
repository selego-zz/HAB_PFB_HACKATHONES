import { useNavigate } from 'react-router-dom';
import { useDocumentTitle, useHackathons } from '../../hooks';

const HackathonListPage = () => {
    // Título de pestaña
    useDocumentTitle('Eventos');

    const navigate = useNavigate();
    const { hackathons, hackathonLoading } = useHackathons();

    if (hackathonLoading) {
        return <div>Cargando...</div>;
    }

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold">Hackatones</h1>
            <ul className="mt-4">
                {hackathons.map((hackathon) => (
                    <li
                        key={hackathon.id}
                        className="mb-4 p-4 border rounded"
                        onClick={() => navigate(`/hackathons/${hackathon.id}`)}
                    >
                        <h2 className="text-xl font-semibold">
                            {hackathon.name}
                        </h2>
                        <p>
                            <strong>Fecha:</strong> {hackathon.hackathonDate} -{' '}
                            {hackathon.hackathonEnd}
                        </p>
                        <p>
                            <strong>Ubicación:</strong> {hackathon.location}
                        </p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default HackathonListPage;
