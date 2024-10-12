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
                            srcSet="/logo/app-logo-small.png"
                        />
                        <img
                            src="/logo/app-logo.png"
                            alt="Logo de la página reducido."
                            className="h-16 w-16 ml-7 mt-2 mb-2 sm:h-16 sm:w-36 sm:ml-10 sm:mb-2 "
                        />
                    </picture>
                </NavLink>

                <nav className="flex items-center gap-2 sm:gap-4 sm:mr-10 mr-5">
                    {/* Botones para diferentes roles */}
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
                        <NavLink to="/users" className="button-rounded-green">
                            <button>Listado de usuarios</button>
                        </NavLink>
                    )}

                    {/* Botones de autenticación */}
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
                        <>
                            <NavLink
                                to="/profile"
                                className="button-rounded-green"
                            >
                                <button>Perfil</button>
                            </NavLink>
                            <NavLink to="/">
                                <button
                                    onClick={authLogoutState}
                                    className="button-rounded-green"
                                >
                                    Cerrar sesión
                                </button>
                            </NavLink>
                        </>
                    )}
                </nav>
            </div>
            <div className="hidden sm:block">
                <h1 className="bg-azuloscuro h-24 font-semibold text-3xl text-center px-20 text-blanco font-jost flex justify-center items-center w-screen">
                    Participa en los mejores hackathons en línea y presenciales.
                </h1>
            </div>
        </header>
    );
};

export default Header;
