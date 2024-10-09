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
                            className="h-16 ml-7 mt-2 sm:h-14 sm:w-32 sm:ml-10 sm:mt-4 "
                        />
                    </picture>
                </NavLink>

                {/* Botones para diferentes roles */}
                <nav>
                    {isDeveloper() && (
                        <NavLink
                            to="/events"
                            className="bg-verdeclaro text-negro py-2 px-4 rounded-3xl hover:bg-verdemarino mx-auto sm:mx-0"
                        >
                            <button className="w-full text-center">
                                Eventos
                            </button>
                        </NavLink>
                    )}
                    {isOrganizer() && (
                        <NavLink
                            to="/hackathons/create"
                            className="bg-verdemarino text-negro py-2 px-4 rounded-3xl hover:bg-verdeagua mx-auto sm:mx-0"
                        >
                            <button className="w-full text-center">
                                Crea un Hackathon
                            </button>
                        </NavLink>
                    )}
                    {isAdmin() && (
                        <NavLink
                            to="/users"
                            className="bg-verdeagua text-negro py-2 px-4 rounded-3xl hover:bg-verdemarino mx-auto sm:mx-0"
                        >
                            <button className="w-full text-center">
                                Listado de usuarios
                            </button>
                        </NavLink>
                    )}
                </nav>

                {/* Botones de autenticación */}
                <nav className="flex">
                    {!authUser ? (
                        <>
                            <NavLink
                                to="/login"
                                className="bg-casiblanco text-negro py-2 px-4 rounded-3xl hover:bg-verdeclaro mx-auto sm:mx-0"
                            >
                                <button className="w-full text-center">
                                    Iniciar sesión
                                </button>
                            </NavLink>
                            <NavLink
                                to="/users/register"
                                className="bg-verdeclaro text-negro py-2 px-4 rounded-3xl hover:bg-azuloscuro hover:text-blanco mx-auto sm:mx-0"
                            >
                                <button className="w-full text-center">
                                    Registrarse
                                </button>
                            </NavLink>
                        </>
                    ) : (
                        <>
                            <NavLink
                                to="/profile"
                                className="bg-blanco text-negro py-2 px-4 rounded-3xl hover:bg-casiblanco mx-auto sm:mx-0"
                            >
                                <button className="w-full text-center">
                                    Perfil
                                </button>
                            </NavLink>
                            <NavLink to="/">
                                <button
                                    onClick={authLogoutState}
                                    className="bg-casiblanco text-negro py-2 px-4 rounded-3xl hover:bg-rojoclaro mx-auto sm:mx-0"
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
