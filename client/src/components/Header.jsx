import { useContext, useState, useEffect, useRef } from 'react';
import { AuthContext } from '../contexts/AuthContext.jsx';
import { NavLink } from 'react-router-dom';

const { VITE_API_UPLOADS } = import.meta.env;

//////

const Header = () => {
    const authContext = useContext(AuthContext);
    const [isMenuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef(null);

    // useEffect se ejecuta siempre que el menú se abra o cierre
    useEffect(() => {
        // Solo añade el listener si el menú está abierto
        if (isMenuOpen) {
            window.addEventListener('mousedown', handleClickOutside);
        }

        // Cleanup para evitar fugas de memoria
        return () => {
            window.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isMenuOpen]);

    // Verifica que el contexto de autenticación no sea nulo
    if (!authContext) {
        return null; // Retorna null si no hay contexto
    }

    const { authUser, isAdmin, isDeveloper, isOrganizer, authLogoutState } =
        authContext;

    const toggleMenu = () => {
        setMenuOpen((prev) => !prev);
    };

    const handleClickOutside = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
            setMenuOpen(false);
        }
    };

    return (
        <header className="bg-azuloscuro text-blanco sm:bg-blanco sm:text-azuloscuro w-full relative">
            <div className="flex justify-between items-center max-w-full mx-auto px-4 py-2 sm:px-10">
                {/* Logo */}
                <NavLink to="/">
                    <picture>
                        <source
                            media="(max-width: 639px)"
                            srcSet="/logo/app-logo-small.png"
                        />
                        <img
                            src="/logo/app-logo.png"
                            alt="Logo de la página."
                            className="h-16 w-16 sm:h-16 sm:w-36"
                        />
                    </picture>
                </NavLink>

                {/* Navegación de botones */}
                <nav className="flex items-center gap-2">
                    {isDeveloper() && (
                        <NavLink
                            to="/hackathons"
                            className="button-rounded-green"
                        >
                            <button>Eventos</button>
                        </NavLink>
                    )}
                    {isOrganizer() && (
                        <NavLink
                            to="/hackathons/create"
                            className="button-rounded-green"
                        >
                            <button>Crea un Hackathon</button>
                        </NavLink>
                    )}
                    {isAdmin() && (
                        <NavLink
                            to="users/getAllUsers"
                            className="button-rounded-green"
                        >
                            <button>Listado de usuarios</button>
                        </NavLink>
                    )}
                </nav>

                {/* Icono de avatar (menú hamburguesa) o botones de inicio de sesión */}
                <div className="flex items-center">
                    {!authUser ? (
                        <>
                            <NavLink
                                to="/users/login"
                                className="button-rounded-green"
                            >
                                <button>Iniciar sesión</button>
                            </NavLink>
                            <NavLink
                                to="/users/register"
                                className="button-rounded-green"
                            >
                                <button>Registrarse</button>
                            </NavLink>
                        </>
                    ) : (
                        <button onClick={toggleMenu} className="text-blanco">
                            <img
                                src={
                                    VITE_API_UPLOADS + '/' + authUser.avatar ||
                                    VITE_API_UPLOADS + '/default-avatar.png'
                                }
                                alt="Avatar del usuario"
                                className="h-12 w-12 rounded-full"
                            />
                        </button>
                    )}
                </div>
            </div>

            {/* Fondo oscurecido cuando el menú hamburguesa está abierto */}
            {isMenuOpen && (
                <div className="fixed inset-0 bg-negro bg-opacity-50 z-40"></div>
            )}

            {/* Menú hamburguesa con "Perfil" y "Cerrar sesión" */}
            {isMenuOpen && (
                <nav
                    ref={menuRef}
                    className="absolute top-16 right-7 bg-azuloscuro text-blanco w-fit rounded-lg shadow-lg z-50 p-6"
                >
                    <ul className="flex flex-col items-center">
                        <li className="py-2">
                            <NavLink
                                to="/users"
                                className="button-rounded-green"
                                onClick={toggleMenu}
                            >
                                Perfil
                            </NavLink>
                        </li>
                        <li className="py-2">
                            <button
                                onClick={() => {
                                    toggleMenu();
                                    authLogoutState();
                                }}
                                className="button-rounded-red"
                            >
                                Cerrar sesión
                            </button>
                        </li>
                    </ul>
                </nav>
            )}

            {/* Texto promocional */}
            <div className="hidden items-center justify-center h-fit sm:block">
                <h1 className="bg-azuloscuro font-semibold text-3xl text-center px-4 py-2 sm:px-20 text-blanco font-jost">
                    Participa en los mejores hackathons en línea y presenciales.
                </h1>
            </div>
        </header>
    );
};

export default Header;
