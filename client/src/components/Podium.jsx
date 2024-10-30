// Importamos las prop-types.
import PropTypes from 'prop-types';

const Podium = ({ podium }) => {
    return (
        <article className="w-56 min-h-64 font-jost bg-verdeclaro text-center rounded-2xl flex flex-col justify-center shadow-md p-2 border-2 border-solid border-azuloscuro">
            <h2 className="font-semibold text-azuloscuro">1º clasificado:</h2>
            <p className="mb-2">{podium[0].username}</p>
            <h2 className="font-semibold text-azuloscuro ">2º clasificado:</h2>
            <p className="mb-2">{podium[1].username}</p>
            <div className="font-semibold text-azuloscuro ">
                3º clasificado:
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
