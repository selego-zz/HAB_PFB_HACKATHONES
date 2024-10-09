// Importamos las prop-types.
import PropTypes from 'prop-types';

const getStar = (star) => {
    return <span>{star}</span>;
};

const Rating = ({ rating, ranking }) => {
    const _stars = [];
    for (let i = 0; i < 5; i++)
        i < rating ? _stars.push('★') : _stars.push('☆');

    return (
        <article className="Rating w-48 bg-verdeclaro text-center rounded-2xl">
            <h2>Rating</h2>
            <div className="stars text-casiblanco hover:shadow-2xl">
                {_stars.map((star) => getStar(star))}
            </div>
            <h2>Puntuacion de usuario</h2>
            <div className="ranking">{ranking}</div>
        </article>
    );
};
// Validamos las props.
Rating.propTypes = {
    rating: PropTypes.number.isRequired,
    ranking: PropTypes.number.isRequired,
};

export default Rating;
