# HACK-A-TON

## Descripción

_HACK-A-TON_ es un proyecto web basado en **Node.js** para el _back-end_ y **React** para el _front-end_. Se trata de una plataforma que muestra un calendario de eventos competitivos de programación a los visitantes, quienes podrán acceder a los detalles concretos de cada uno y realizar una búsqueda filtrada de los mismos según sus preferencias, así como comprobar los _rankings_ de ganadores una vez concluyen.

La web permite registro de usuarios, con rol a escoger entre **desarrolladores** y **organizadores**. El usuario de tipo **administrador** tendrá permisos especiales respetando la privacidad del resto de usuarios, y será el encargado de autorizar a los organizadores para que publiquen sus _hackathones_.

Los **desarrolladores** podrán inscribirse como participantes en cuantos desafíos deseen, cancelar sus inscripciones dentro de los plazos establecidos y dejar valoraciones de 1 a 5 estrellas a los eventos en los que hayan participado. A su vez, los **organizadores**, una vez autorizados, podrán añadir sus _hackathones_ a la página, con los detalles, objetivos, premios, requerimientos, etc. Todos los usuarios registrados tendrán la posibilidad de gestionar y modificar sus perfiles a conveniencia.

## Instalación y ejecución

1. Una vez clonado el repositorio, se ha de abrir una terminal y navegar hasta el directorio de la carpeta raíz del proyecto. A continuación, se ejecutará `npm install` para instalar automáticamente todas las dependencias necesarias.

2. Se ha de guardar el archivo `.env.example` como `.env` y rellenar los datos necesarios para la ejecución, prestando especial atención a los que comienzan por ADMIN_USER, pues sus datos serán los del administrador de la plataforma.

3. Para crear la base de datos presentamos 2 opciones:
   a. Con solo un usuario administrador en ella: ejecutaremos el comando `npm run initdb`.
   b. Con un conjunto de datos de prueba además del usuario administrador: ejecutaremos el comando `npm run initdummydb`.

4. Para arrancar el servidor ejecutaremos `npm run dev`, el cual estará disponible en `http://localhost:PUERTO`, siendo `PUERTO` el valor asignado en `.env`. Por ejemplo, para un valor de puerto de 8000, sería `http://localhost:8000`.

5. Se puede utilizar el archivo con la colección de peticiones de Postman incluido en el repositorio para comprobar los _end-points_.

## Endpoints de usuarios

- **POST** - ["/api/users/register"] - Crea un nuevo usuario. No requiere autenticación.

- **POST** - ["/api/users/addOrganizer"] - Para que el administrador registre un organizador.

- **POST** - ["/api/users/organizers/request] - Solicitud al administrador para registrarse como organizador. No requiere autenticación.

- **PATCH** - ["/api/users/register/validate/:activationCode"] - Validar usuario con un código. No requiere autenticación. (Mientras se desarrolle la API será GET).

- **POST** - ["/api/users/login"] - Logea un usuario ya creado. No requiere autenticación.

- **GET** - ["/api/users/"] - Devuelve el perfil del usuario. Sí requiere autenticación.

- **PUT** - ["/api/users/update"] - Actualizar perfil del usuario. Sí requiere autenticación.

- **PUT** - ["api/users/password"] - Actualiza la contraseña. Sí requiere autenticación.

- **PUT** - ["/api/users/password/recover"] - Envía email con código de recuperación. No requiere autenticación.

- **PUT** - ["/api/users/password/recover/:recoverPassCode"] - Cambia la contraseña recuperada. No requiere autenticación.

## Endpoints de hackathones

- **GET** - ["/api/hackathons"] - Devuelve un listado de eventos de hackathons filtrados y/o ordenados por localización, estado, duración, preferencias. No requiere autenticación.

- **POST** - ["/api/hackathons"] - Añadir un evento de hackathon. Requiere autenticación de organizador.

- **PUT** - ["/api/hackathons/:hackathonId/update"] - Actualizar evento de hackathon. Requiere auntenticación de organizador.

- **GET** - ["/api/hackathons/:hackathonId"] - Devuelve información sobre un evento de hackathon. Requiere autenticación de desarrollador u organizador.

- **POST** - ["/api/hackathons/:hackathonId/registration"] - Inscripción a un evento de hackathon. Requiere autenticación de desarrollador.

- **GET** - ["/api/hackathons/user/hackathons"] - Devuelve una lista de los eventos de hackathons en los que el usuario está registrado. Requiere autenticación de desarrollador.

- **DELETE** - ["/api/hackathons/:hackathonId/delete"] - Eliminar un hackathon. Requiere autenticación del organizador.

- **DELETE** - ["/api/hackathons/:hackathonId/cancel"] - Eliminar una inscripción hasta un límite máximo. Requiere autenticación del desarrollador.

- **PUT** - ["/api/hackathons/:hackathonId/rating"] - Rating 1-5 después de la fecha de realización. Requiere autenticación del desarrollador.

- **PUT** - ["/api/hackathons/:hackathonId/:developerId/classification"] - Clasificación de los participates después de cada competición. Requiere autenticación del organizador.

- **GET** - ["/api/technologies"] - Devuelve un listado de tecnologías de los hackathons. Ninguna autenticación.

- **GET** - ["/api/themes"] - Devuelve un listado de temas de los hackathons. Ninguna autenticación.
