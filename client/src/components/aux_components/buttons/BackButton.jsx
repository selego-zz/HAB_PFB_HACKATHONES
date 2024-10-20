import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

//////

const BackButton = ({ className }) => {
    const navigate = useNavigate();

    const handleBack = () => {
        navigate(-1); // Navega a la página anterior en el historial
    };

    return (
        <button onClick={handleBack} className={className} title="Volver atrás">
            ⬅
        </button>
    );
};

// Validar las props
BackButton.propTypes = {
    className: PropTypes.string,
};

export default BackButton;
