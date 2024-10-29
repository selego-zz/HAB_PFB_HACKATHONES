// Importamos las prop-types.
import PropTypes from 'prop-types';

import useHackathons from '../hooks/useHackathons';
import { useState } from 'react';

import Swal from 'sweetalert2';

///////

const MakeStar = (star, rating, setRating, hackathonId, isDeveloper) => {
    const { updateRating } = useHackathons();
    return (
        <span
            key={rating}
            className="cursor-pointer transition-colors duration-300 transform hover:text-blanco"
            onClick={async () => {
                if (isDeveloper) {
                    const confirmChangeRating = await Swal.fire({
                        title: 'Cambiar valoración',
                        text: '¿Estás seguro de querer cambiar tu valoración de este hackathon?',
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Sí, quiero cambiarla',
                        cancelButtonText: 'Cancelar',
                    });

                    if (confirmChangeRating.isConfirmed) {
                        updateRating(hackathonId, rating);
                        setRating(rating);
                        Swal.fire(
                            '¡Hecho!',
                            'La puntuación ha sido actualizada.',
                            'success',
                        );
                    }
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
    isDeveloper,
}) => {
    const [rating, setRating] = useState(initialRating);
    const _stars = [];
    for (let i = 0; i < 5; i++) _stars.push(i < rating ? '★' : '☆');

    return (
        <article className="w-56 min-h-64 font-jost bg-verdeclaro text-center rounded-2xl flex flex-col justify-center sm:p-2 shadow-md">
            <h2 className="font-bold">Rating</h2>
            <div className="stars text-4xl text-amarillo group">
                {_stars.map((star, index) =>
                    MakeStar(
                        star,
                        index + 1,
                        setRating,
                        hackathonId,
                        isDeveloper,
                    ),
                )}
            </div>
            {!isDeveloper && (
                <section>
                    <p>
                        La opinión media sobre este Hackathon ha sido de{' '}
                        {rating} / 5
                    </p>
                </section>
            )}
            {isDeveloper && (
                <section>
                    <p>Has obtenido: {ranking} Puntos</p>
                    <p className=" text-azuloscuro font-bold text-sm p-3">
                        Conseguiste el puesto: {position}
                    </p>
                </section>
            )}
        </article>
    );
};
// Validamos las props.
Rating.propTypes = {
    hackathonId: PropTypes.number.isRequired,
    initialRating: PropTypes.number.isRequired,
    ranking: PropTypes.number.isRequired,
    position: PropTypes.number,
    isDeveloper: PropTypes.bool.isRequired,
};

export default Rating;
