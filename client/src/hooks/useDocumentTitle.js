import { useEffect } from 'react';
const { VITE_APP_NAME } = import.meta.env;

///////

// Hook personalizado que actualiza el título de la pestaña en el navegador según la página en la que se esté
const useDocumentTitle = (title) => {
    useEffect(() => {
        document.title = `${title} | ${VITE_APP_NAME}`;
    }, [title]);
};

export default useDocumentTitle;
