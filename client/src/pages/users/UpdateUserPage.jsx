// Importamos hooks
import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDocumentTitle } from '../../hooks/index.js';

// Importamos contexts
import { AuthContext } from '../../contexts/AuthContext.jsx';

import toast from 'react-hot-toast';

/////////////////////////////////

const UpdateUserPage = () => {
    // Título de pestaña
    useDocumentTitle('Actualización de perfil');

    //tomamos la función del contexto de usuario que se encarga del update
    const { updateUser, updateUserWithAvatar, updatePassword, authUser } =
        useContext(AuthContext);

    //id, rol y email no pueden cambiarse
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [repeatedPassword, setRepeatedPassword] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [avatar, setAvatar] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [biography, setBiography] = useState('');
    const [linkedIn, setLinkedIn] = useState('');

    const navigate = useNavigate();

    // UseEffect para establecer los valores iniciales de estado
    useEffect(() => {
        if (authUser) {
            setUsername(authUser.username || '');
            setFirstName(authUser.firstName || '');
            setLastName(authUser.lastName || '');
            setBiography(authUser.biography || '');
            setLinkedIn(authUser.linkedIn || '');
        }
    }, [authUser]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Comprobamos que las contraseñas coincidan
            if (
                (password || repeatedPassword) &&
                password !== repeatedPassword
            ) {
                throw new Error('Las contraseñas no coinciden');
            }
            if (password.length > 0 && oldPassword.length < 1) {
                throw new Error(
                    'No puedes cambiar la contraseña si no pones la contraseña actual',
                );
            }

            const user = {};
            if (username.length) user.username = username;
            if (avatar !== '') user.avatar = avatar;
            if (firstName.length) user.firstName = firstName;
            if (lastName.length) user.lastName = lastName;
            if (biography.length) user.biography = biography;
            if (linkedIn.length) user.linkedIn = linkedIn;

            if (avatar !== '') updateUserWithAvatar(user);
            else updateUser(user);

            try {
                if (password.length) updatePassword(oldPassword, password);
            } catch (err) {
                toast.error(err, { id: 'UpdateUser' });
            }

            setTimeout(() => {
                navigate('/users');
            }, 3000);
        } catch (err) {
            toast.error(
                err.message ||
                    'Hubo un error en el registro, inténtalo de nuevo más tarde.',
                { id: 'UpdateUser' },
            );
        }
    };

    return (
        <main>
            <h2 className="text-header-big">
                Actualización de datos de usuario
            </h2>
            <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-4 sm:grid sm:grid-cols-2"
            >
                <div>
                    <label className="text-common" htmlFor="username">
                        Nombre de usuario
                    </label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="input-box"
                    />
                </div>
                <div>
                    <label className="text-common" htmlFor="linkedIn">
                        enlace a LinkedIn
                    </label>
                    <input
                        type="text"
                        id="linkedIn"
                        name="linkedIn"
                        value={linkedIn}
                        onChange={(e) => setLinkedIn(e.target.value)}
                        className="input-box"
                    />
                </div>
                <div>
                    <label className="text-common" htmlFor="firstName">
                        Nombre
                    </label>
                    <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="input-box"
                    />
                </div>
                <div>
                    <label className="text-common" htmlFor="lastName">
                        Apellidos
                    </label>
                    <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="input-box"
                    />
                </div>
                <div>
                    <label className="text-common" htmlFor="avatar">
                        Avatar
                    </label>
                    <input
                        type="file"
                        id="avatar"
                        name="avatar"
                        accept="image/jpeg, image/png"
                        onChange={(e) => setAvatar(e.target.files[0])}
                        className="input-box"
                    />
                </div>
                <div>
                    <label className="text-common" htmlFor="biography">
                        Biografía
                    </label>
                    <input
                        type="text"
                        id="biography"
                        name="biography"
                        value={biography}
                        onChange={(e) => setBiography(e.target.value)}
                        className="input-box"
                    />
                </div>
                <div>
                    <label className="text-common" htmlFor="password">
                        Contraseña
                    </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="input-box"
                    />
                </div>
                <div>
                    <label className="text-common" htmlFor="repeatedPassword">
                        Repite la contraseña
                    </label>
                    <input
                        type="password"
                        id="repeatedPassword"
                        name="repeatedPassword"
                        value={repeatedPassword}
                        onChange={(e) => setRepeatedPassword(e.target.value)}
                        className="input-box"
                    />
                </div>
                <div>
                    <label className="text-common" htmlFor="oldPassword">
                        Como medida de seguridad: si cambias la contraseña
                        tienes que indicarnos la contraseña actual.
                        <br />
                        Solo es necesario si quieres cambiar la contraseña
                    </label>
                    <input
                        type="password"
                        id="oldPassword"
                        name="oldPassword"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                        className="input-box"
                    />
                </div>

                <div className="col-span-2">
                    <button className="button-rounded-green">
                        Actualizar Datos
                    </button>
                </div>
            </form>
        </main>
    );
};

export default UpdateUserPage;
