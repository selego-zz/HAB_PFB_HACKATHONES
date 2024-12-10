import { useContext, useState, useEffect, useRef } from 'react';
import { AuthContext } from '../contexts/AuthContext.jsx';
import { NavLink } from 'react-router-dom';

import { BackButton, ForwardButton } from './aux_components/buttons/index.js';

//////

const Header = () => {
    const authContext = useContext(AuthContext);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
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

    const { authUser, isAdmin, isOrganizer, authLogoutState } = authContext;

    const toggleMenu = () => {
        setIsMenuOpen((prev) => !prev);
    };

    const handleClickOutside = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
            setIsMenuOpen(false);
        }
    };

    return (
        <header className="bg-azuloscuro text-blanco sm:bg-blanco sm:text-azuloscuro w-full relative">
            <div className="flex justify-between items-center max-w-7xl mx-auto px-6 py-2 sm:px-10">
                {/* Logo */}

                <NavLink to="/">
                    <picture>
                        <source
                            media="(max-width: 770px)"
                            srcSet="/logo/app-logo-small.png"
                        />
                        <img
                            src="/logo/app-logo.png"
                            alt="Logo de la página."
                            className="h-16 w-fit"
                        />
                    </picture>
                </NavLink>

                {/* Navegación de botones */}
                <div className="flex gap-3 mx-3 ml-auto">
                    <BackButton className="button-back" />
                    <ForwardButton className="button-forward" />
                </div>
                <nav className="hidden sm:flex items-center gap-1 mx-3">
                    <NavLink
                        to="/hackathons"
                        className="button-rounded-green w-20"
                    >
                        <button>Eventos</button>
                    </NavLink>

                    {isOrganizer() && (
                        <NavLink
                            to="/hackathons/create"
                            className="button-rounded-green"
                        >
                            <button>Añadir Hackathon</button>
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
                <div className="flex items-center gap-2">
                    {!authUser ? (
                        <>
                            <NavLink
                                to="/users/login"
                                className="button-rounded-green w-fit p-2"
                            >
                                <button>Iniciar sesión</button>
                            </NavLink>
                            <NavLink
                                to="/users/register"
                                className="button-rounded-green w-fit p-2"
                            >
                                <button>Registrarse</button>
                            </NavLink>
                        </>
                    ) : (
                        <button onClick={toggleMenu} className="text-blanco">
                            <img
                                src={authUser.avatar}
                                alt="Avatar del usuario"
                                className="h-16 w-16 rounded-full ml-3"
                            />
                        </button>
                    )}
                </div>
            </div>

            {/* Fondo oscurecido cuando el menú hamburguesa está abierto */}
            {isMenuOpen && (
                <div className="fixed inset-0 bg-negro bg-opacity-50 z-40"></div>
            )}

            {/* Menú hamburguesa con botones adicionales para pantallas pequeñas */}
            {isMenuOpen && (
                <nav
                    ref={menuRef}
                    className="absolute top-16 right-7 bg-azuloscuro text-blanco w-fit rounded-lg shadow-lg z-50 p-6"
                >
                    <ul className="flex flex-col items-center">
                        {/* Botones adicionales en pantallas pequeñas */}
                        <li className="py-2 sm:hidden">
                            <NavLink
                                to="/hackathons"
                                className="button-rounded-green"
                                onClick={toggleMenu}
                            >
                                Eventos
                            </NavLink>
                        </li>
                        {isOrganizer() && (
                            <li className="py-2 sm:hidden">
                                <NavLink
                                    to="/hackathons/create"
                                    className="button-rounded-green"
                                    onClick={toggleMenu}
                                >
                                    Añadir Hackathon
                                </NavLink>
                            </li>
                        )}
                        {isAdmin() && (
                            <li className="py-2 sm:hidden">
                                <NavLink
                                    to="users/getAllUsers"
                                    className="button-rounded-green"
                                    onClick={toggleMenu}
                                >
                                    Listado de usuarios
                                </NavLink>
                            </li>
                        )}
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
