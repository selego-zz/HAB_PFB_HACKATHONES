import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import Rating from './Rating';
import { useEffect } from 'react';

const HackathonList = ({ hackathons, showRating }) => {
    const navigate = useNavigate();

    useEffect(() => {
        hackathons.forEach((hackathon) => {
            const element = document.getElementById(`section-${hackathon.id}`);
            if (element) {
                element.onclick = () => {
                    console.log('navigate to ' + hackathon.id);
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
                    className="flex justify-between  mb-4 p-4 border rounded cursor-pointer"
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
                    {showRating && (
                        <Rating
                            hackathonId={hackathon.id}
                            initialRating={
                                hackathon.rating ? hackathon.rating : 0
                            }
                            ranking={hackathon.score ? hackathon.score : 0}
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
