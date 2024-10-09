import { useEffect } from 'react';
import useHackathons from '../hooks/useHackathons';

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
        </main>
    );
};

export default PruebaPage;
