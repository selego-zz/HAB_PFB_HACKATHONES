import PropTypes from 'prop-types';

//////

const ScrollToTopButton = ({ className }) => {
    const handleScrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth', // Desplazamiento suave
        });
    };

    return (
        <button
            onClick={handleScrollToTop}
            className={className}
            title="Volver arriba"
        >
            ↑
        </button>
    );
};

// Validar las props
ScrollToTopButton.propTypes = {
    className: PropTypes.string, // className debe ser una cadena de texto, opcional
};

export default ScrollToTopButton;
