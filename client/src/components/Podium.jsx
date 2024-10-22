// Importamos las prop-types.
import PropTypes from 'prop-types';

const Podium = ({ podium }) => {
    return (
        <article className="min-w-48 min-h-40 font-jost bg-verdeclaro text-center rounded-2xl flex flex-col justify-center ">
            <h2 className="font-semibold text-azuloscuro">
                Primer clasificado:
            </h2>
            <p>{podium[0].username}</p>
            <h2 className="font-semibold text-azuloscuro ">
                Segundo clasificado:
            </h2>
            <p>{podium[1].username}</p>
            <div className="font-semibold text-azuloscuro ">
                Tecer clasificado:
            </div>
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
