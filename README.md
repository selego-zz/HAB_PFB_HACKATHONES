# Hackathones

## Descripción

_Hackathones_ es un proyecto web basado en **Node.js** y **React**. Se trata de una plataforma que muestra un calendario de eventos competitivos de programación a los visitantes, quienes podrán acceder a los detalles concretos de cada uno y realizar una búsqueda filtrada de los mismos según sus preferencias, así como comprobar los _rankings_ de ganadores una vez concluyen.

La web permite registro de usuarios, con rol a escoger entre **desarrolladores** y **organizadores**. Los desarrolladores podrán inscribirse como participantes en cuantos desafíos deseen, cancelar sus inscripciones dentro de los plazos establecidos y dejar valoraciones de 1 a 5 estrellas a los eventos en los que hayan participado. A su vez, los organizadores podrán añadir sus _hackathones_ al calendario de la página, con los detalles, objetivos, premios, requerimientos, etc. Todos los usuarios registrados tendrán la posibilidad de gestionar y modificar sus perfiles a conveniencia.

## Instalación y ejecución

Para el _back-end_, junto con Node.js, se han utilizado el _framework_ **Express** y la dependencia **Nodemon**, entre otros. Una vez clonado el repositorio, se ha de abrir una terminal y navegar hasta el directorio de la carpeta raíz del proyecto. A continuación, se ejecutará `npm install` para instalar automáticamente todas las dependencias necesarias.

Para arrancar la base de datos ejecutaremos el comando `npm run initdb`; y para arrancar el servidor con Nodemon ejecutaremos `npm run dev`, el cual por defecto estará disponible en `http://localhost:3000`. Se puede utilizar el archivo con la colección de peticiones de Postman incluido en el repositorio para comprobar los _end-points_.

## Endpoints Users

✅- **POST** - ["/api/users/register"] - Crea un nuevo usuario. No requiere autenticación.

✅- **PUT** - ["/api/users/register/validate/:validationCode"] - Validar usuario con un código. No requiere autenticación.

✅- **POST** - ["/api/users/login"] - Logea un usuario ya creado. No requiere autenticación.

✅- **GET** - ["/api/users/"] - Devuelve el perfil del usuario. Sí requiere autenticación.

✅- **PUT** - ["/pi/users/update"] - Actualizar perfil del usuario. Sí requiere autenticación.

✅- **PUT** - ["/api/users/password/recover"] - Envía email con código de recuperación. No requiere autenticación.

✅- **PUT** - ["/api/users/password/reset/:recoverPassCode"] - Cambia la contraseña. No requiere autenticación.

## Endpoitns Hackathons

✅- **GET** - ["/api/hackathons"] - Devuelve un listado de eventos de hackatones filtrados y/o ordenados por localización, estado, duración, preferencias. No requiere autenticación.

✅- **POST** - ["/api/hackathons"] - Añadir un evento de hackathone. Sí require autenticación de organizador.

✅- **PUT** - ["/api/hackathons/update"] - Actualizar evento de hackathon. Requiere auntentificación de organizador.

✅- **GET** - ["/api/hackathons/:hackatonsId"] - Devuelve información sobre un evento de hackathon. Requiere autenticación de desarrollador u organizador.

✅- **POST** - ["/api/hackathons/registration"] - Inscripción a un evento de hackathone. Requiere autenticación de desarrollador.

✅- **GET** - ["/api/hackathons/userHackathons"] - Devuelve una lista de los eventos de hackathones en los que el usuario está registrado. Requiere autenticación de desarrollador.

✅- **DELETE** - ["/api/hackathons/delete"] - Eliminar una inscripción hasta un límite máximo. Requieren autentificación del desarrollador.

✅- **PUT** - ["/api/hackathons/rating"] - Rating 1-5 después de la fecha de realización. Requiere autentificación del desarrollador.

✅- **PUT** - ["/api/hackathons/classification"] - Clasificación de los participaten después de cada competición.
