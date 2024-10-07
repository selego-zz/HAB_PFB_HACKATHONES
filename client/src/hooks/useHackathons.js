//importamos los hooks

import { useEffect, useState } from 'react';

// Importamos la URL del servidor.
const { VITE_API_URL } = import.meta.env;

// Inicializamos el hook.
const useHackathons = () => {
  const [hackathons, setHackathons] = useState([]);
  const [query, setQuery] = useState([]);
  const [hackathonLoading, setHackathonLoading] = useState(false);

  // Obtenemos todos los hackathons cuando se crea el hook
  useEffect(() => {
    const fetchHackathons = async () => {
      setHackathonLoading(true);
      try {
        //solicitamos la información
        let res;
        if (query.length < 1) res = await fetch(`${VITE_API_URL}/hackathons`);
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
          (newHackathon) => newHackathon.id === hackathon.id
        );

        if (!newHackathon) return false;

        // si el hackathon de newHackathons tiene una fecha de modificación distinta, devolvemos false
        if (hackathon.updatedAt !== newHackathon.updatedAt) return false;
      }

      return true;
    };
    fetchHackathons();
  }, [hackathons, query]);

  return { hackathons, hackathonLoading, setQuery };
};

export default useHackathons;
