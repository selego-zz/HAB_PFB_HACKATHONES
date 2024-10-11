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
        <header className=" bg-azuloscuro text-blanco sm:bg-blanco sm:text-azuloscuro  w-screen ">
            <div className="flex justify-between items-center">
                {/* Logo */}
                <NavLink to="/">
                    <picture>
                        <source
                            media="(max-width: 640px)"
                            srcSet="/Logo/logo.png"
                        />
                        <img
                            src="/Logo/logo1.png"
                            alt="Logo"
                            className="h-16 w-16 ml-7 mt-2 mb-2 sm:h-16 sm:w-36 sm:ml-10 sm:mb-2 "
                        />
                    </picture>
                </NavLink>

                <nav className="flex items-center gap-2 sm:gap-4 sm:mr-10 mr-5">
                    {/* Botones para diferentes roles */}
                    {isDeveloper() && (
                        <NavLink
                            to="/hackathons"
                            className="flex items-center justify-center  bg-casiblanco text-azuloscuro rounded-3xl  hover:bg-verdeclaro font-jost font-semibold sm:h-9 sm:w-32 h-7 w-20 text-sm sm:text-lg"
                        >
                            <button>Eventos</button>
                        </NavLink>
                    )}
                    {isOrganizer() && (
                        <NavLink
                            to="/hackathons/create"
                            className="flex items-center justify-center  bg-casiblanco text-azuloscuro rounded-3xl  hover:bg-verdeclaro font-jost font-semibold sm:h-9 sm:w-44 h-7 w-36 text-sm sm:text-lg"
                        >
                            <button>Crea un Hackathon</button>
                        </NavLink>
                    )}
                    {isAdmin() && (
                        <NavLink
                            to="/users"
                            className="flex items-center justify-center  bg-casiblanco text-azuloscuro rounded-3xl  hover:bg-verdeclaro font-jost font-semibold sm:h-9 sm:w-44 h-7 w-36 text-sm sm:text-lg"
                        >
                            <button>Listado de usuarios</button>
                        </NavLink>
                    )}

                    {/* Botones de autenticación */}
                    {!authUser ? (
                        <>
                            <NavLink
                                to="/users/login"
                                className="flex items-center justify-center  bg-casiblanco text-azuloscuro rounded-3xl  hover:bg-verdeclaro font-jost font-semibold sm:h-9 sm:w-32 h-7 w-24 text-sm sm:text-lg"
                            >
                                <button>Iniciar sesión</button>
                            </NavLink>
                            <NavLink
                                to="/users/register"
                                className="flex items-center justify-center  bg-casiblanco text-azuloscuro rounded-3xl  hover:bg-verdeclaro font-jost font-semibold sm:h-9 sm:w-32 h-7 -24 text-sm sm:text-lg"
                            >
                                <button>Registrarse</button>
                            </NavLink>
                        </>
                    ) : (
                        <>
                            <NavLink
                                to="/profile"
                                className="flex items-center justify-center  bg-casiblanco text-azuloscuro rounded-3xl  hover:bg-verdeclaro font-jost font-semibold sm:h-9 sm:w-32 h-7 w-20 text-sm sm:text-lg"
                            >
                                <button>Perfil</button>
                            </NavLink>
                            <NavLink to="/">
                                <button
                                    onClick={authLogoutState}
                                    className="flex items-center justify-center  bg-casiblanco text-azuloscuro rounded-3xl  hover:bg-verdeclaro font-jost font-semibold sm:h-9 sm:w-32 h-7 w-24 text-sm sm:text-lg"
                                >
                                    Cerrar sesión
                                </button>
                            </NavLink>
                        </>
                    )}
                </nav>
            </div>
            <div className="hidden sm:block">
                <h1 className="bg-azuloscuro h-24 font-semibold text-4xl text-blanco font-jost flex justify-center items-center w-screen">
                    Participa en los mejores hackathons en línea y presenciales.
                </h1>
            </div>
        </header>
    );
};

export default Header;
