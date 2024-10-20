// Importamos las prop-types.
import PropTypes from 'prop-types';

const Podium = ({ podium }) => {
    return (
        <article className="Rating w-56 p-1 bg-verdeclaro text-left rounded-2xl">
            <h2 className="font-bold">Primer clasificado:</h2>
            <p>{podium[0].username}</p>
            <h2 className="font-bold ">Segundo clasificado:</h2>
            <p>{podium[1].username}</p>
            <div className="font-bold ">Tecer clasificaddo:</div>
            <p>{podium[2].username}</p>
        </article>
    );
};
// Validamos las props.
Podium.propTypes = {
    podium: PropTypes.arrayOf(
        PropTypes.shape({
            username: PropTypes.string.isRequired,
            score: PropTypes.number.isRequired,
            position: PropTypes.number.isRequired,
        }),
    ).isRequired,
};

export default Podium;
