import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext.jsx';
import { NavLink } from 'react-router-dom';
const { VITE_APP_NAME } = import.meta.env;

//////

const Header = () => {
    const authContext = useContext(AuthContext);
    if (!authContext) {
        return null;
    }

    const { authUser, isAdmin, isDeveloper, isOrganizer, authLogoutState } =
        authContext;

    return (
        <header className="bg-blanco text-negro py-4 shadow-md">
            <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center">
                <NavLink to="/" className="text-2xl font-bold mb-2 sm:mb-0">
                    <h1>{VITE_APP_NAME}</h1>
                </NavLink>

                <nav className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 mb-2 sm:mb-0">
                    {isDeveloper() && (
                        <NavLink
                            to="/events"
                            className="bg-verdeclaro text-negro py-2 px-4 rounded-3xl hover:bg-verdemarino"
                        >
                            <button>Eventos</button>
                        </NavLink>
                    )}
                    {isOrganizer() && (
                        <NavLink
                            to="/hackathons/create"
                            className="bg-verdemarino text-negro py-2 px-4 rounded-3xl hover:bg-verdeagua"
                        >
                            <button>Crea un Hackathon</button>
                        </NavLink>
                    )}
                    {isAdmin() && (
                        <NavLink
                            to="/user-list"
                            className="bg-verdeagua text-negro py-2 px-4 rounded-3xl hover:bg-verdemarino"
                        >
                            <button>Listado de usuarios</button>
                        </NavLink>
                    )}
                </nav>

                <nav className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
                    {!authUser ? (
                        <>
                            <NavLink
                                to="/login"
                                className="bg-casiblanco text-negro py-2 px-4 rounded-3xl hover:bg-verdeclaro"
                            >
                                <button>Iniciar sesión</button>
                            </NavLink>
                            <NavLink
                                to="/users/register"
                                className="bg-verdeclaro text-negro py-2 px-4 rounded-3xl hover:bg-azuloscuro hover:text-blanco"
                            >
                                <button>Registrarse</button>
                            </NavLink>
                        </>
                    ) : (
                        <>
                            <NavLink
                                to="/profile"
                                className="bg-blanco text-negro py-2 px-4 rounded-3xl hover:bg-casiblanco"
                            >
                                <button>Perfil</button>
                            </NavLink>
                            <NavLink to="/">
                                <button
                                    onClick={authLogoutState}
                                    className="bg-casiblanco text-negro py-2 px-4 rounded-3xl hover:bg-rojoclaro"
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
