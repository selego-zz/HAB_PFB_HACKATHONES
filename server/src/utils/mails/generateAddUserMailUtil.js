const generateAddUserMailUtil = (username, activationCode) => {
    const mail = `
            ¡Hola, ${username}!

            Gracias por registrarte en Hackathon. Para activar tu cuenta, haz click en el siguiente enlace:

            <a href="http://localhost:${process.env.PORT}/api/users/register/validate/${activationCode}">¡Activa tu usuario!</a>
        `;

    return mail;
};
export default generateAddUserMailUtil;
