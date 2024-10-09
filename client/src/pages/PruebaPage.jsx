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
            <p>
                Prueba de rating: recibe HackathonId, Rating y Ranking, y si
                cambiamos el rating, manda el mensaje a la API para
                actualizarlo.
            </p>
            <p>
                En este ejemplo estoy pasando HackathonId={10} rating={4}
                ranking={185}. así que a menos que el usuario esté apuntado a
                ese hackathon fallará, pero sirve para que lo veais
            </p>
            <Rating HackathonId={10} rating={4} ranking={185} />
        </main>
    );
};

export default PruebaPage;
