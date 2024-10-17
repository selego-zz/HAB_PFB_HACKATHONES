import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

///////

// Componente auxiliar que mueve el scroll al tope cada vez que cambia la ruta
const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
};

export default ScrollToTop;
