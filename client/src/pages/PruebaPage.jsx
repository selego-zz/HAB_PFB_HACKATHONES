import { useEffect } from 'react';
import useHackathons from '../hooks/useHackathons';
import Rating from '../components/Rating';

const PruebaPage = () => {
    const {
        hackathons,
        hackathonLoading,
        addFilter,
        /*         filter,
        removeFilter,
        //tecnologias y temas
        technologies,
        addTechnology,
        removeTechnology,
        themes,
        addTheme,
        removeTheme,
        //Consultar los ordenes, añadir nuevo orden, eliminar orden
        order,
        addOrder,
        removeOrder,
 */
    } = useHackathons();

    useEffect(() => {
        if (hackathonLoading) return;

        addFilter({ name: 'ai' });
        console.log(hackathons);
    }, [hackathons, addFilter, hackathonLoading]);

    return (
        <main>
            <p>Prueba</p>
            <Rating rating={4} ranking={185} />
        </main>
    );
};

export default PruebaPage;
