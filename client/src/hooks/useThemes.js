import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

// Importamos la URL del servidor.
const { VITE_API_URL } = import.meta.env;

//////

const useThemes = () => {
    const [themes, setThemes] = useState([]);
    const [themesLoading, setThemesLoading] = useState(true);

    useEffect(() => {
        const fetchThemes = async () => {
            try {
                const res = await fetch(`${VITE_API_URL}/themes`);
                const body = await res.json();

                if (body.status === 'error') throw new Error(body.message);

                setThemes(body.data);
            } catch (err) {
                toast.error(err.message);
            } finally {
                setThemesLoading(false);
            }
        };

        fetchThemes();
    }, []);

    return { themes, setThemes, themesLoading };
};

export default useThemes;
