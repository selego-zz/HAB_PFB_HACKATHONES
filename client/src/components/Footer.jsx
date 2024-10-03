const { VITE_APP_NAME } = import.meta.env;

const Footer = () => {
  return (
    <footer className=' bg-green-300'>
      {VITE_APP_NAME} &copy; Grupo B 2024
    </footer>
  );
};

export default Footer;
