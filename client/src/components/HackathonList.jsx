import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import Rating from './Rating';
import { useContext, useEffect } from 'react';
import { AuthContext } from '../contexts/AuthContext';

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
                    className="flex justify-between  mb-4 p-4 border rounded cursor-pointer md:w-3/5"
                >
                    <section id={`section-${hackathon.id}`}>
                        <h2 className="text-xl font-semibold">
                            {hackathon.name}
                        </h2>
                        <p>
                            <strong>Fecha:</strong> {hackathon.hackathonDate} -{' '}
                            {hackathon.hackathonEnd}
                        </p>
                        <p>
                            <strong>Ubicación:</strong> {hackathon.location}
                        </p>
                    </section>

                    {showRating && isDeveloper() && (
                        <Rating
                            hackathonId={hackathon.id}
                            editable={true}
                            scoreText={'Puntuación obtenida'}
                            initialRating={
                                hackathon.rating ? hackathon.rating : 0
                            }
                            ranking={hackathon.score ? hackathon.score : 0}
                        />
                    )}
                    {showRating && !isDeveloper() && (
                        <Rating
                            hackathonId={hackathon.id}
                            editable={false}
                            scoreText={'Puntuación media'}
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
