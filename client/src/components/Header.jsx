import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext.jsx';
import { NavLink } from 'react-router-dom';

const Header = () => {
    const authContext = useContext(AuthContext);
    if (!authContext) {
        return null;
    }

    const { authUser, isAdmin, isDeveloper, isOrganizer, authLogoutState } =
        authContext;

    return (
        <header className=" bg-azuloscuro text-blanco sm:bg-blanco sm:text-azuloscuro p-1">
            <div className="flex justify-between items-center">
                {/* Logo */}
                <NavLink to="/" className="text-2xl font-bold mb-2 sm:mb-0">
                    <picture>
                        <source
                            media="(max-width: 640px)"
                            srcSet="/Logo/logo.png"
                        />
                        <img
                            src="/Logo/logo1.png"
                            alt="Logo"
                            className="h-16 w-16 ml-7 mt-2 sm:h-16 sm:w-36 sm:ml-10 sm:mt-4 "
                        />
                    </picture>
                </NavLink>

                {/* Botones para diferentes roles */}
                <nav>
                    {isDeveloper() && (
                        <NavLink
                            to="/events"
                            className="bg-casiblanco text-azuloscuro text-center p-1.5 w-32 rounded-3xl h-9 hover:bg-verdeclaro font-jost font-semibold"
                        >
                            <button>Eventos</button>
                        </NavLink>
                    )}
                    {isOrganizer() && (
                        <NavLink
                            to="/hackathons/create"
                            className="bg-casiblanco text-azuloscuro text-center p-1.5 w-32 rounded-3xl h-9 hover:bg-verdeclaro font-jost font-semibold"
                        >
                            <button>Crea un Hackathon</button>
                        </NavLink>
                    )}
                    {isAdmin() && (
                        <NavLink
                            to="/users"
                            className="bg-casiblanco text-azuloscuro text-center p-1.5 w-32 rounded-3xl h-9 hover:bg-verdeclaro font-jost font-semibold"
                        >
                            <button>Listado de usuarios</button>
                        </NavLink>
                    )}
                </nav>

                {/* Botones de autenticación */}
                <nav className="flex gap-4">
                    {!authUser ? (
                        <>
                            <NavLink
                                to="/users/login"
                                className="bg-casiblanco text-azuloscuro text-center p-1.5 w-32 rounded-3xl h-9 hover:bg-verdeclaro font-jost font-semibold"
                            >
                                <button>Iniciar sesión</button>
                            </NavLink>
                            <NavLink
                                to="/users/register"
                                className="bg-casiblanco text-azuloscuro text-center p-1.5 w-32 rounded-3xl h-9 hover:bg-verdeclaro font-jost font-semibold"
                            >
                                <button>Registrarse</button>
                            </NavLink>
                        </>
                    ) : (
                        <>
                            <NavLink
                                to="/profile"
                                className="bg-casiblanco text-azuloscuro text-center p-1.5 w-32 rounded-3xl h-9 hover:bg-verdeclaro font-jost font-semibold"
                            >
                                <button>Perfil</button>
                            </NavLink>
                            <NavLink to="/">
                                <button
                                    onClick={authLogoutState}
                                    className="bg-casiblanco text-azuloscuro text-center p-1.5 w-32 rounded-3xl h-9 hover:bg-verdeclaro font-jost font-semibold"
                                >
                                    Cerrar sesión
                                </button>
                            </NavLink>
                        </>
                    )}
                </nav>
            </div>
        </header>
    );
};

export default Header;
