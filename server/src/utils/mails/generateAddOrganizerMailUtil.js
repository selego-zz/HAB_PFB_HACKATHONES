const generateAddOrganizerMailUtil = (username, email, firstName, lastName) => {
    const mail = `Hola, estás recibiendo este correo porque un organizador ha tratado de darse de alta en ${process.env.APP_NAME}. Sus datos son: 
        <ul>
        <li> Nombre de usuario: ${username} </li>
        <li> E-mail: ${email} </li>
        <li> Nombre: ${firstName} </li>
        <li> Apellido: ${lastName} </li> 
        </ul>`;

    return mail;
};
export default generateAddOrganizerMailUtil;
