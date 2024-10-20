import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import Rating from './Rating';
import { useContext, useEffect } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import Podium from './Podium';

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
            {hackathons.map((hackathon) => (
                <li
                    key={hackathon.id}
                    className="flex justify-between  mb-4 p-4 rounded-md cursor-pointer md:w-3/5 bg-gradient-to-r from-verdeclaro to-blanco shadow-md h-44 border-l-4 border-r-4 border-azuloscuro hover:border-l-8 hover:border-r-8"
                >
                    <section id={`section-${hackathon.id}`}>
                        <h2 className="text-xl font-semibold font-jost m-3 ">
                            {hackathon.name}
                        </h2>
                        <p className="font-jost m-3">
                            <strong>Fecha:</strong> {hackathon.hackathonDate} -{' '}
                            {hackathon.hackathonEnd}
                        </p>
                        <p className="font-jost m-3">
                            <strong>Ubicación:</strong> {hackathon.location}
                        </p>
                    </section>

                    <section className="flex">
                        {showRating && <Podium podium={hackathon.ranking} />}
                        {showRating && isDeveloper() && (
                            <Rating
                                hackathonId={hackathon.id}
                                isDeveloper={true}
                                position={hackathon.position}
                                initialRating={
                                    hackathon.rating ? hackathon.rating : 0
                                }
                                ranking={hackathon.score ? hackathon.score : 0}
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
            ))}
        </ul>
    );
};

HackathonList.propTypes = {
    hackathons: PropTypes.array.isRequired,
    showRating: PropTypes.bool,
};

export default HackathonList;
