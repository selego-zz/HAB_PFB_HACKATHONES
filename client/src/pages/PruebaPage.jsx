import useHackathons from '../hooks/useHackathons';

const PruebaPage = () => {
  const { hackathons } = useHackathons();
  console.log(hackathons);
  return (
    <main>
      <p>Prueba</p>
    </main>
  );
};

export default PruebaPage;
