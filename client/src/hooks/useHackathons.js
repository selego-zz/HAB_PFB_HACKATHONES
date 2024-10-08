//importamos los hooks

import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext.jsx';

// Importamos la URL del servidor.
const { VITE_API_URL } = import.meta.env;

////////////////////////////////////////////////////////////////////////
// Con este Hook controlaremos todo lo relacionado con los hackathons
//
//   hackathons - contiene el listado de los hackathon filtrado o no
//       addHackathon
//       recibe un objeto hackathon que tiene exclusivamente
//         los siguientes campos:
//            name,
//            inscriptionDate,
//            inscriptionEnd,
//            hackathonDate,
//            hackathonEnd,
//            maxParticipants,
//            prizes,
//            online,
//            location,
//
//   filter - Variable de estado que contiene los filtros que se aplicarán a los hackaton
//     es un array de json de la forma {clave: valor} donde
//       clave es el campo de la tabla de la base de datos por el que filtramos
//       valor es el valor del camplo aplicado al filtro
//
//   addFilter(newFilter) Función añade a filter un nuevo par clave-valor
//     representando un nuevo filtro
//     si la clave ya estuviera en filter la sustitute
//
//   removeFilter(oldFilter) Función que elimina de filter la pareja
//     clave-valor cuya clave coincide con oldFilter
//
//   technologies - Conjunto de tecnologías por los que se filtra
//     addTechnology - Añade una tecnología al conjunto
//     removeTechnology - Elimina una tecnología del conjunto
//
//   themes - Conjunto de temas por los que se filtra
//     addTheme - Añade un tema al conjunto
//     removeTheme - Elimina un tema del conjunto
//
//   order - es un array de string, que indica los campos de la base de datos
//      por lo que se ordena
//      cada string puede tener una o 2 "palabras"
//      la primera es el nombre del campo por el que se ordena
//      la segunda ha de ser o "asc" o "desc" indicando si se aplica orden
//        asdencente o descendente
//      si la segunda palabra no es "asc" o "desc", se cambiará
//        automáticamente a "asc"
////////////////////////////////////////////////////////////////////////
const useHackathons = () => {
    const { authToken } = useContext(AuthContext);

    const [hackathons, setHackathons] = useState([]);
    const [query, setQuery] = useState([]);
    const [filter, setFilters] = useState([]);
    const [technologies, setTechnologies] = useState([]);
    const [themes, setThemes] = useState([]);
    const [order, setOrder] = useState([]);
    const [hackathonLoading, setHackathonLoading] = useState(false);

    // Obtenemos todos los hackathons cuando se crea el hook
    useEffect(() => {
        const fetchHackathons = async () => {
            setHackathonLoading(true);
            try {
                //solicitamos la información
                let res;
                if (query.length < 1)
                    res = await fetch(`${VITE_API_URL}/hackathons`);
                else
                    res = await fetch(`${VITE_API_URL}/hackathons`, {
                        body: JSON.stringify(query),
                    });
                const body = await res.json();

                if (body.status === 'error') throw new Error(body.message);

                if (!compareHackathons(body.data)) setHackathons(body.data);
            } catch (err) {
                console.error(err);
                throw new Error(err.message);
            } finally {
                setHackathonLoading(false);
            }
        };

        const compareHackathons = (newHackathons) => {
            if (!hackathons) {
                return false;
            }
            if (hackathons?.length !== newHackathons?.length) return false;
            for (const hackathon of hackathons) {
                //para cada hackathon del state
                //buscamos un hackathon con id equivalente en newHackathons. si no lo hay, devolvemos false

                const newHackathon = newHackathons.find(
                    (newHackathon) => newHackathon.id === hackathon.id,
                );

                if (!newHackathon) return false;

                // si el hackathon de newHackathons tiene una fecha de modificación distinta, devolvemos false
                if (hackathon.updatedAt !== newHackathon.updatedAt)
                    return false;
            }

            return true;
        };
        fetchHackathons();
    }, [hackathons, query]);

    ////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////
    const addHackathon = async (hackathon) => {
        try {
            const res = await fetch(`${VITE_API_URL}/hackathons`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: authToken,
                },
                body: JSON.stringify(hackathon),
            });
            const body = await res.json();

            if (body.status === 'error') throw new Error(body.message);
            setHackathons([]);
            return 'Hackathon creado exitosamente';
        } catch (err) {
            throw new Error(err);
        }
    };

    ////////////////////////////////////////////////////////////
    // De aquí en adelante será lo relativo a todo lo que se
    // pasa como filtro al get hackathon
    ////////////////////////////////////////////////////////////

    useEffect(() => {
        const newQuery = filter;
        newQuery.push(themes);
        newQuery.push(technologies);
        newQuery.push(order);
        setQuery(newQuery);
    }, [filter, themes, technologies, order]);
    const addFilter = (newFilter) => {
        setFilters((prevFilters) => {
            // Filtrar los filtros existentes para eliminar cualquier filtro con la misma clave
            const updatedFilters = prevFilters.filter(
                (filter) =>
                    Object.keys(filter)[0] !== Object.keys(newFilter)[0],
            );
            // Añadir el nuevo filtro
            return [...updatedFilters, newFilter];
        });
    };

    const removeFilter = (oldFilter) => {
        setFilters((prevFilters) =>
            prevFilters.filter(
                (filter) => Object.keys(filter)[0] !== oldFilter,
            ),
        );
    };

    const addTechnology = (newTechnology) => {
        if (!technologies.includes(newTechnology))
            setTechnologies(...technologies, newTechnology);
    };
    const removeTechnology = (oldTechnology) => {
        setTechnologies((prevTechnologies) => {
            prevTechnologies.filter(
                (technology) => technology != oldTechnology,
            );
        });
    };

    const addTheme = (newTheme) => {
        if (!themes.includes(newTheme)) setThemes(...themes, newTheme);
    };
    const removeTheme = (oldTheme) => {
        setThemes((prevThemes) => {
            prevThemes.filter((theme) => theme != oldTheme);
        });
    };

    const addOrder = (newOrder) => {
        // como newOrder puede simplemente indicar una columna, o una columna y un orden "order by id" o "order by id desc"
        // voy a tomar por una parte la clave, y por otra el orden ascendente o descendente
        let key = '';
        let orderDirection = '';
        if (newOrder.includes(' ')) {
            key = newOrder.slice(0, newOrder.find(' '));
            orderDirection = newOrder.slice(newOrder.find(' '));
        } else key = newOrder;
        // si el orden no está bien escrito, lo pongo ascendente
        if (orderDirection !== ' asc' && orderDirection !== ' desc')
            orderDirection = ' asc';

        // ahora, antes de meterlo en los ordenes, me aseguro de que no está
        if (order.includes(key + ' asc')) removeOrder(key);
        if (order.includes(key + ' desc')) removeOrder(key);
        setOrder(...order, key + orderDirection);
    };
    const removeOrder = (oldOrder) => {
        let key = '';
        if (oldOrder.includes(' ')) {
            key = oldOrder.slice(0, oldOrder.find(' '));
        } else key = oldOrder;

        let index;
        // vamos a buscar si está tanto ascendente como descendente
        // no puede estar sin sentido por que lo añadimos si no lo incluye
        // buscamos en orden ascendente
        index = order.indexOf(key + ' asc');
        // si no está, pues descendente
        if (index < 0) index = order.indexOf(key + ' desc');
        // si no está, no cambiamos nada
        if (index < 0) return;

        order.splice(index, 1);

        // Actualiza el estado de la lista de órdenes
        setOrder([...order]);
    };

    return {
        // Variables relaccionadas con el hackathon
        hackathons,
        hackathonLoading,
        addHackathon,
        // de aquí en adelante es para añadir y quitar filtros y ordenes
        //Consultar los filtros, añadir nuevo filtro, eliminar filtro
        filter,
        addFilter,
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
    };
};

export default useHackathons;
