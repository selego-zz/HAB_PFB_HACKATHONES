const { VITE_APP_NAME } = import.meta.env;

const Header = () => {
  const role = 'desarrollador';
  const user = '';
  return (
    <header className='bg-azuloscuro'>
      <h1> {VITE_APP_NAME} </h1>
      {role === 'desarrollador' && <button>Eventos</button>}
      {role === 'organizador' && <button>Crea un Hackathon</button>}
      {role === 'administrador' && <button>Listado de usuarios</button>}
      <nav>
        {!user && (
          <>
            <button>Iniciar sesión</button>
            <button>Registrarse</button>
          </>
        )}
        {user && (
          <>
            <button>Perfil</button>
            <button>Cerrar sesión</button>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
