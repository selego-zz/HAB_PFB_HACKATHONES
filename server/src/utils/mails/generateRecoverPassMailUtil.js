const generateRecoverPassMailUtil = (username, recoverPassCode) => {
    const recoveryLink =
        process.env.CLIENT_URL + '/users/recoverPass/' + recoverPassCode;

    const mail = `<h2>Recuperación de contraseña</h2>
<br>
<h3>Hola ${username}</h3>
<p>Estás recibiendo este correo electrónico porque alguien ha intentado recuperar tu contraseña de nuestro portal <b>${process.env.APP_NAME}<b>.</p>
<p>Si quieres cambiar tu contraseña, haz click en el siguiente enlace, e introduce una contraseña nueva. ¡No olvides repetir la nueva contraseña en la casilla de contraseña repetida, o no podrás cambiarla!</p>
<p>El enlace de recuperación de contraseña es: <a href='${recoveryLink}'>${recoveryLink}</a>.</p>
<p>Si no has solicitado el cambio de contraseña, puedes ignorar este correo.</p>    `;

    return mail;
};
export default generateRecoverPassMailUtil;
