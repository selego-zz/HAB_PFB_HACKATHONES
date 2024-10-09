// Importamos las prop-types.
import PropTypes from 'prop-types';

import useHackathons from '../hooks/useHackathons';

const MakeStar = (star, rating, hackathonId) => {
    const { updateRating } = useHackathons();
    return (
        <span
            className="hover:text-6xl cursor-pointer"
            onClick={() => {
                if (confirm('¿Está seguro de que desea cambiar la puntuación?'))
                    updateRating(hackathonId, rating);
            }}
        >
            {star}
        </span>
    );
};

const Rating = ({ hackathonId, rating, ranking }) => {
    const _stars = [];
    for (let i = 0; i < 5; i++)
        i < rating ? _stars.push('★') : _stars.push('☆');

    return (
        <article className="Rating w-56 p-2 bg-verdeclaro text-center rounded-2xl">
            <h2 className="font-bold">Rating</h2>
            <div className="stars text-4xl text-amarillo group">
                {_stars.map((star, index) =>
                    MakeStar(star, index + 1, hackathonId),
                )}
            </div>
            <h2 className="font-bold">Puntuacion de usuario</h2>
            <div className="ranking text-2xl text-azuloscuro font-bold">
                {ranking}
            </div>
        </article>
    );
};
// Validamos las props.
Rating.propTypes = {
    hackathonId: PropTypes.number.isRequired,
    rating: PropTypes.number.isRequired,
    ranking: PropTypes.number.isRequired,
};

export default Rating;
