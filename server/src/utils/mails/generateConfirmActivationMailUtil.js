const generateConfirmActivationMailUtil = (username) => {
    const pageLink = `${process.env.CLIENT_URL}`;
    const mail = `
            ¡Hola, ${username}!

            Gracias por registrarte en ${process.env.APP_NAME}.
            El administrador ha revisado tu solicitud de alta como organizador y la ha aceptado, ¡enhorabuena!

            Ya puedes comenzar a publicar tus hackathons en: <a href='${pageLink}'>${pageLink}</a>
        `;

    return mail;
};
export default generateConfirmActivationMailUtil;
