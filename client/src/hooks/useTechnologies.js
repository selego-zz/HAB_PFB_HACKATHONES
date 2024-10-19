import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

// Importamos la URL del servidor.
const { VITE_API_URL } = import.meta.env;

//////

const useTechnologies = () => {
    const [technologies, setTechnologies] = useState([]);
    const [techLoading, setTechLoading] = useState(true);

    useEffect(() => {
        const fetchTechnologies = async () => {
            try {
                const res = await fetch(`${VITE_API_URL}/technologies`);
                const body = await res.json();

                if (body.status === 'error') throw new Error(body.message);

                setTechnologies(body.data);
            } catch (err) {
                toast.error(err.message);
            } finally {
                setTechLoading(false);
            }
        };

        fetchTechnologies();
    }, []);

    return { technologies, setTechnologies, techLoading };
};

export default useTechnologies;
