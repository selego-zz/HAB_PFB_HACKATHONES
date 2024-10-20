// Importamos las prop-types.
import PropTypes from 'prop-types';

import useHackathons from '../hooks/useHackathons';
import { useState } from 'react';

const MakeStar = (star, rating, setRating, hackathonId, editable) => {
    const { updateRating } = useHackathons();
    return (
        <span
            key={rating}
            className="hover:text-6xl cursor-pointer"
            onClick={() => {
                if (
                    editable &&
                    confirm('¿Está seguro de que desea cambiar la puntuación?')
                ) {
                    updateRating(hackathonId, rating);
                    setRating(rating);
                }
            }}
        >
            {star}
        </span>
    );
};

const Rating = ({
    hackathonId,
    initialRating,
    ranking,
    position,
    scoreText,
    editable,
}) => {
    const [rating, setRating] = useState(initialRating);
    const _stars = [];
    for (let i = 0; i < 5; i++) _stars.push(i < rating ? '★' : '☆');

    return (
        <article className="Rating w-56 p-2 bg-verdeclaro text-center rounded-2xl">
            <h2 className="font-bold">Rating</h2>
            <div className="stars text-4xl text-amarillo group">
                {_stars.map((star, index) =>
                    MakeStar(star, index + 1, setRating, hackathonId, editable),
                )}
            </div>
            <h2 className="font-bold">{scoreText} </h2>
            <div className="ranking text-lg text-azuloscuro font-bold">
                {ranking} Puntos - Posición {position}
            </div>
        </article>
    );
};
// Validamos las props.
Rating.propTypes = {
    hackathonId: PropTypes.number.isRequired,
    initialRating: PropTypes.number.isRequired,
    ranking: PropTypes.number.isRequired,
    position: PropTypes.number.isRequired,
    scoreText: PropTypes.string.isRequired,
    editable: PropTypes.bool.isRequired,
};

export default Rating;
