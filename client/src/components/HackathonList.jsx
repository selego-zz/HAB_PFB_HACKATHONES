import { useNavigate } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { Rating, Podium } from './index.js';

import PropTypes from 'prop-types';

// Formato de fechas
import dayjs from 'dayjs';

const { VITE_API_UPLOADS } = import.meta.env;

//////

const HackathonList = ({ hackathons, showRating }) => {
    const navigate = useNavigate();
    const { isDeveloper } = useContext(AuthContext);

    useEffect(() => {
        hackathons.forEach((hackathon) => {
            const element = document.getElementById(`section-${hackathon.id}`);

            if (element) {
                element.onclick = () => {
                    navigate(`/hackathons/${hackathon.id}`);
                };
            }
        });
    }, [hackathons, navigate]);

    return (
        <ul className="mt-4">
            {hackathons.map((hackathon) => {
                const formattedStartDate = dayjs(
                    hackathon.hackathonDate,
                ).format('DD/MM/YYYY HH:mm');
                const formattedEndDate = dayjs(hackathon.hackathonEnd).format(
                    'DD/MM/YYYY HH:mm',
                );
                return (
                    <li
                        key={hackathon.id}
                        className="flex flex-col md:flex-row  rounded-md cursor-pointer md:w-4/5 bg-gradient-to-r from-verdeclaro to-blanco shadow-md sm:h-44 border-l-4 border-r-4 border-azuloscuro hover:border-l-8 hover:border-r-8"
                    >
                        <img
                            className="w-24 h-24  border-4 rounded-sm border-verdemarino border-opacity-25"
                            src={`${VITE_API_UPLOADS}/${hackathon?.logo}`}
                            alt="Logo del hackathon."
                        />
                        <section
                            id={`section-${hackathon.id}`}
                            className="border"
                        >
                            <h2 className="text-sm sm:text-xl font-semibold font-jost m-3">
                                {hackathon.name}
                            </h2>
                            <p className="font-jost m-3 text-sm sm:text-md">
                                <strong>Fecha:</strong> {formattedStartDate} -{' '}
                                {formattedEndDate}
                            </p>
                            <p className="font-jost m-3 text-sm sm:text-md">
                                <strong>Ubicación:</strong> {hackathon.location}
                            </p>
                        </section>

                        <section className="flex gap-8 items-center border">
                            {showRating && (
                                <Podium podium={hackathon.ranking} />
                            )}
                            {showRating && isDeveloper() && (
                                <Rating
                                    hackathonId={hackathon.id}
                                    isDeveloper={true}
                                    position={hackathon.position}
                                    initialRating={
                                        hackathon.rating ? hackathon.rating : 0
                                    }
                                    ranking={
                                        hackathon.score ? hackathon.score : 0
                                    }
                                />
                            )}
                            {showRating && !isDeveloper() && (
                                <Rating
                                    hackathonId={hackathon.id}
                                    isDeveloper={false}
                                    position={hackathon.position}
                                    initialRating={
                                        hackathon.average_rating
                                            ? parseInt(hackathon.average_rating)
                                            : 0
                                    }
                                    ranking={
                                        hackathon.average_score
                                            ? parseInt(hackathon.average_score)
                                            : 0
                                    }
                                />
                            )}
                        </section>
                    </li>
                );
            })}
        </ul>
    );
};

HackathonList.propTypes = {
    hackathons: PropTypes.array.isRequired,
    showRating: PropTypes.bool,
};

export default HackathonList;
