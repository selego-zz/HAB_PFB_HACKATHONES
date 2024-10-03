const { VITE_APP_NAME } = import.meta.env;

const Header = () => {
  return (
    <header className='bg-green-300'>
      <h1> {VITE_APP_NAME} </h1>
    </header>
  );
};

export default Header;
