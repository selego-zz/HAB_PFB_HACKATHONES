//importamos los hooks

import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext.jsx';

// Importamos la URL del servidor.
const { VITE_API_URL } = import.meta.env;

/* no implemento las siguientes rutas */
// put '/hackathons/:hackathonId/:developerId/ranking',
// post '/hackathons/:hackathonId/registration',
// delete '/hackathons/:hackathonId/cancel',

////////////////////////////////////////////////////////////////////////
// Con este Hook controlaremos todo lo relacionado con los hackathons
//
//   hackathons - contiene el listado de los hackathon filtrado o no
//       hackathonLoading - indica si el hackathon se está cargando
//       addHackathon = async (hackathon)
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
//       deleteHackathon = async (hackathonId) => {
//       getAllInscriptionsFromAHackathon = async (hackathonId) => {
//       getHackathon = async (hackathonId) => {
//       getUsersHackathon = async () => {
//       updateHackathon = async (hackathon) => {
//       updateRating = async (hackathonId, rating) => {
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
//     clave-valor cuya clave coincide con el string oldFilter
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
    const [query, setQuery] = useState({});
    const [filter, setFilters] = useState({});
    const [technologies, setTechnologies] = useState([]);
    const [themes, setThemes] = useState([]);
    const [orderBy, setOrderBy] = useState([]);
    const [hackathonLoading, setHackathonLoading] = useState(false);

    // Obtenemos todos los hackathons cuando se crea el hook
    useEffect(() => {
        const fetchHackathons = async () => {
            setHackathonLoading(true);
            try {
                //solicitamos la información
                let res;
                const queryLength = Object.keys(query).length;

                if (queryLength < 1) {
                    res = await fetch(`${VITE_API_URL}/hackathons`);
                } else {
                    const queryString = new URLSearchParams({
                        data: JSON.stringify(query),
                    }).toString();
                    res = await fetch(
                        `${VITE_API_URL}/hackathons?${queryString}`,
                    );
                }

                const body = await res.json();

                if (body.status === 'error') throw new Error(body.message);

                if (!compareHackathons(hackathons, body.data))
                    setHackathons(body.data);
            } catch (err) {
                console.error(err);
                throw new Error(err.message);
            } finally {
                setHackathonLoading(false);
            }
        };

        fetchHackathons();
    }, [hackathons, query]);

    ////////////////////////////////////////////////////////////
    // Diferentes fetch de hackathons
    ////////////////////////////////////////////////////////////
    const compareHackathons = (hackathons, newHackathons) => {
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
            if (hackathon.updatedAt !== newHackathon.updatedAt) return false;
        }

        return true;
    };
    const addHackathon = async (hackathon) => {
        try {
            if (hackathon.logo.length < 1) {
                delete hackathon.logo;
            }
            if (hackathon.documentation.length < 1) {
                delete hackathon.documentation;
            }

            const formData = new FormData();

            // Adjuntamos todos los elementos de userProfile al formData.
            for (const [key, value] of Object.entries(hackathon)) {
                formData.append(key, value);
            }

            const res = await fetch(`${VITE_API_URL}/hackathons`, {
                method: 'POST',
                headers: {
                    Authorization: authToken,
                },
                body: formData,
            });

            const body = await res.json();

            if (body.status === 'error') throw new Error(body.message);
            setHackathons([]);
            return body.message;
        } catch (err) {
            throw new Error(err);
        }
    };
    const deleteHackathon = async (hackathonId) => {
        // delete '/hackathons/:hackathonId/delete',
        try {
            const res = await fetch(
                `${VITE_API_URL}/hackathons/${hackathonId}/delete`,
                {
                    method: 'DELETE',
                    headers: {
                        Authorization: authToken,
                    },
                },
            );
            const body = await res.json();

            if (body.status === 'error') throw new Error(body.message);

            return body.message;
        } catch (err) {
            throw new Error(err);
        }
    };

    const getAllInscriptionsFromAHackathon = async (hackathonId) => {
        /// /hackathons/: hackathonId/enrollments
        try {
            const res = await fetch(
                `${VITE_API_URL}/hackathons/${hackathonId}/enrollments`,
                {
                    headers: {
                        Authorization: authToken,
                    },
                },
            );
            const body = await res.json();

            if (body.status === 'error') throw new Error(body.message);

            return body.data;
        } catch (err) {
            throw new Error(err);
        }
    };

    const getHackathon = async (hackathonId) => {
        // get '/hackathons/:hackathonId',
        try {
            const authorization = authToken
                ? {
                      headers: {
                          Authorization: authToken,
                      },
                  }
                : null;
            const res = await fetch(
                `${VITE_API_URL}/hackathons/${hackathonId}`,
                authorization,
            );
            const body = await res.json();

            if (body.status === 'error') throw new Error(body.message);

            return body.data;
        } catch (err) {
            throw new Error(err);
        }
    };
    const getUsersHackathon = async () => {
        try {
            const res = await fetch(
                `${VITE_API_URL}/hackathons/user/hackathons`,
                {
                    headers: {
                        Authorization: authToken,
                    },
                },
            );
            const body = await res.json();

            if (body.status === 'error') throw new Error(body.message);

            return body.data;
        } catch (err) {
            throw new Error(err);
        }
    };
    const updateRating = async (hackathonId, rating) => {
        // put '/hackathons/:hackathonId/rating',
        try {
            const res = await fetch(
                `${VITE_API_URL}/hackathons/${hackathonId}/rating`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: authToken,
                    },
                    body: JSON.stringify({ rating }),
                },
            );
            const body = await res.json();

            if (body.status === 'error') throw new Error(body.message);

            return body.message;
        } catch (err) {
            throw new Error(err);
        }
    };
    const updateHackathon = async (hackathon) => {
        const id = hackathon.id;
        delete hackathon.id;

        const formData = new FormData();

        // Adjuntamos todos los elementos de userProfile al formData.
        for (const [key, value] of Object.entries(hackathon)) {
            formData.append(key, value);
        }
        try {
            const res = await fetch(`${VITE_API_URL}/hackathons/${id}/update`, {
                method: 'put',
                headers: {
                    Authorization: authToken,
                },
                body: formData,
            });
            const body = await res.json();

            if (body.status === 'error') throw new Error(body.message);
            setHackathons([]);
            return body.message;
        } catch (err) {
            throw new Error(err);
        }
    };

    const getMaxPrize = async () => {
        try {
            const res = await fetch(`${VITE_API_URL}/maxPrize`);
            const body = await res.json();

            if (body.status === 'error') throw new Error(body.message);
            return body.data;
        } catch (err) {
            throw new Error(err);
        }
    };
    const getMaxParticipants = async () => {
        try {
            const res = await fetch(`${VITE_API_URL}/maxParticipants`);
            const body = await res.json();

            if (body.status === 'error') throw new Error(body.message);
            return body.data;
        } catch (err) {
            throw new Error(err);
        }
    };

    ////////////////////////////////////////////////////////////
    // De aquí en adelante será lo relativo a todo lo que se
    // pasa como filtro al get hackathon
    ////////////////////////////////////////////////////////////

    useEffect(() => {
        const compareArray = (arr1, arr2) => {
            // Compruebo si ambos arrays tienen la misma longitud
            if (arr1.length !== arr2.length) {
                return false;
            }

            // Comparo cada elemento
            for (const item of arr1) {
                if (!arr2.includes(item)) {
                    return false;
                }
            }

            return true;
        };
        const compareQuery = (newQuery) => {
            if (Object.keys(query).length !== Object.keys(newQuery).length)
                return false;
            for (const key in query) {
                //para cada elemento de query
                //comparamos su valor con el de newQuery
                //pero tenemos que tener en cuenta que puede ser un tema, una tecnología o un orden
                switch (key) {
                    case 'theme':
                    case 'technology':
                    case 'orderBy':
                        if (!compareArray(query[key], newQuery[key]))
                            return false;
                        break;

                    default:
                        if (query[key] !== newQuery[key]) return false;
                        break;
                }
            }

            return true;
        };

        let newQuery = {};

        if (Object.keys(filter).length > 0) newQuery = filter;
        if (themes.length > 0) newQuery.themes = themes;
        if (technologies.length > 0) newQuery.technologies = technologies;
        if (orderBy.length > 0) newQuery.order = orderBy;
        if (!compareQuery(newQuery)) setQuery(newQuery);
    }, [filter, themes, technologies, orderBy, query]);

    const addFilter = (newFilter) => {
        //tomo la clave y el valor del filtro que me mandan
        const key = Object.keys(newFilter)[0];
        const value = newFilter[key];
        if (filter[key] === value) return;
        //para actualizar el valor de setFilter crearemos un nuevo objeto
        //y añadiremos o sobreescribiremos la nueva clave
        const updatedFilters = { ...filter };
        updatedFilters[key] = value;

        setFilters(updatedFilters);
    };
    const removeFilter = (oldFilter) => {
        if (!(oldFilter in filter)) return;
        const updatedFilters = { ...filter };
        delete updatedFilters[oldFilter];

        setFilters(updatedFilters);
    };

    const addTechnology = (newTechnology) => {
        if (!technologies.includes(newTechnology))
            setTechnologies(...technologies, newTechnology);
    };
    const removeTechnology = (oldTechnology) => {
        if (!technologies.includes(oldTechnology)) return;
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
        if (!themes.includes(oldTheme)) return;
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

        if (orderBy.includes(key + orderDirection)) return;
        // ahora, antes de meterlo en los ordenes, me aseguro de que no está
        if (orderBy.includes(key + ' asc')) removeOrder(key);
        if (orderBy.includes(key + ' desc')) removeOrder(key);
        setOrderBy(...orderBy, key + orderDirection);
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
        index = orderBy.indexOf(key + ' asc');
        // si no está, pues descendente
        if (index < 0) index = orderBy.indexOf(key + ' desc');
        // si no está, no cambiamos nada
        if (index < 0) return;

        orderBy.splice(index, 1);

        // Actualiza el estado de la lista de órdenes
        setOrderBy([...orderBy]);
    };

    return {
        // Variables relaccionadas con el hackathon
        hackathons,
        hackathonLoading,
        compareHackathons,
        addHackathon,
        deleteHackathon,
        getAllInscriptionsFromAHackathon,
        getHackathon,
        getMaxParticipants,
        getMaxPrize,
        getUsersHackathon,
        updateHackathon,
        updateRating,
        // de aquí en adelante es para añadir y quitar filtros y ordenes
        //Consultar los filtros, añadir nuevo filtro, eliminar filtro
        filter,
        addFilter,
        setFilters,
        removeFilter,
        //tecnologias y temas
        technologies,
        addTechnology,
        removeTechnology,
        themes,
        addTheme,
        removeTheme,
        //Consultar los ordenes, añadir nuevo orden, eliminar orden
        orderBy,
        addOrder,
        removeOrder,
    };
};

export default useHackathons;
