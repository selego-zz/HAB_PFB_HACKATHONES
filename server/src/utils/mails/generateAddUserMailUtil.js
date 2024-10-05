const generateAddUserMailUtil = (username, activationCode) => {
    const activationLink = `${process.env.CLIENT_URL}/users/register/validate/${activationCode}`;
    const mail = `
            ¡Hola, ${username}!

            Gracias por registrarte en ${process.env.APP_NAME}. Para activar tu cuenta, haz click en el siguiente enlace:

            <a href="${activationLink}">${activationLink}</a>
        `;

    return mail;
};
export default generateAddUserMailUtil;
