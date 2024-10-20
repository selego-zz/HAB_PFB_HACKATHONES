import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

//////

const ForwardButton = ({ className }) => {
    const navigate = useNavigate();

    const handleBack = () => {
        navigate(1); // Navega a la página siguiente en el historial
    };

    return (
        <button
            onClick={handleBack}
            className={className}
            title="Volver adelante"
        >
            ➡
        </button>
    );
};

// Validar las props
ForwardButton.propTypes = {
    className: PropTypes.string,
};

export default ForwardButton;
