# HACK-A-TON

## Descripción

_HACK-A-TON_ es un proyecto web basado en **Node.js** para el _back-end_ y **React** para el _front-end_. Se trata de una plataforma que muestra un calendario de eventos competitivos de programación a los visitantes, quienes podrán acceder a los detalles concretos de cada uno y realizar una búsqueda filtrada de los mismos según sus preferencias, así como comprobar los _rankings_ de ganadores una vez concluyen.

La web permite registro de usuarios, con rol a escoger entre **desarrolladores** y **organizadores**. El usuario de tipo **administrador** tendrá permisos especiales respetando la privacidad del resto de usuarios, y será el encargado de autorizar a los organizadores para que publiquen sus _hackathons_.

Los **desarrolladores** podrán inscribirse como participantes en cuantos desafíos deseen, cancelar sus inscripciones dentro de los plazos establecidos y dejar valoraciones de 1 a 5 estrellas a los eventos en los que hayan participado. A su vez, los **organizadores**, una vez autorizados, podrán añadir sus _hackathons_ a la página, con los detalles, objetivos, premios, requerimientos, etc. Todos los usuarios registrados tendrán la posibilidad de gestionar y modificar sus perfiles a conveniencia.

## Instalación y ejecución

Una vez clonado el repositorio, se ha de abrir una terminal y navegar hasta el directorio de la carpeta raíz del proyecto, en la misma se encontrarán 2 carpetas: **Server** y **Client** que contienen las partes de servidor (API) y de cliente (Front End) respectivamente. Debe procederse a la instalación de ambas antes de poder iniciar la plataforma.

### Instalación de la parte del servidor

1. Una vez en el directorio server, se ejecutará `npm install` para instalar automáticamente todas las dependencias necesarias.

2. Se ha de duplicar el archivo `.env.example` con el nombre `.env` y rellenar los datos necesarios para la ejecución, prestando especial atención a los que comienzan por ADMIN_USER, pues sus datos serán los del administrador de la plataforma.

3. Para crear la base de datos presentamos 2 opciones:
   a. Con solo un usuario administrador en ella: ejecutaremos el comando `npm run initdb`.
   b. Con un conjunto de datos de prueba además del usuario administrador: ejecutaremos el comando `npm run initdummydb`.

4. Para arrancar el servidor ejecutaremos `npm run dev`, el cual estará disponible en `http://localhost:PUERTO`, siendo `PUERTO` el valor asignado en `.env`. Por ejemplo, para un valor de puerto de 8000, sería `http://localhost:8000`.

5. Se puede utilizar el archivo con la colección de peticiones de Postman incluido en el repositorio para comprobar los _end-points_.

### Instalación de la parte del servidor

1. Una vez en el directorio client, se ejecutará `npm install` para instalar automáticamente todas las dependencias necesarias.

2. Se ha de duplicar el archivo `.env.local.example` con el nombre `.env.local` y rellenar los datos necesarios para la ejecución.

3. Para arrancar el servicio cliente ejecutaremos `npm run dev`, el cual estará disponible en `http://localhost:PUERTO`, siendo `PUERTO` el valor asignado en `.env.local`. Por ejemplo, para un valor de puerto de 3000, sería `http://localhost:3000`.

## Base de datos

### users

| Campo           | Tipo         | Descripción                                                        |
| --------------- | ------------ | ------------------------------------------------------------------ |
| id              | INT UNSIGNED | Identificador único del usuario                                    |
| username        | VARCHAR(50)  | Nombre de usuario del usuario                                      |
| email           | VARCHAR(100) | Correo electrónico del usuario                                     |
| password        | VARCHAR(100) | Contraseña del usuario (hash)                                      |
| avatar          | VARCHAR(100) | Avatar del usuario                                                 |
| firstName       | VARCHAR(50)  | Nombre del usuario                                                 |
| lastName        | VARCHAR(50)  | Apellidos del usuario                                              |
| role            | ENUM         | Rol del usuario ("administrador", "organizador" o "desarrollador") |
| biography       | VARCHAR(900) | Biografía del usuario                                              |
| linkedIn        | VARCHAR(100) | Red social del usuario                                             |
| recoverPassCode | CHAR(30)     | Código de recuperación de contraseña                               |
| activationCode  | CHAR(30)     | Código de activación de usuario                                    |
| active          | BOOLEAN      | Estado de activación del usuario                                   |
| createdAt       | DATETIME     | Fecha y hora de creación del usuario                               |
| updatedAt       | DATETIME     | Fecha y hora de la última modificación                             |
| lastAuthUpdate  | DATETIME     | Fecha y hora de modificación de contraseña                         |

### hackathons

| Campo           | Tipo          | Descripción                                |
| --------------- | ------------- | ------------------------------------------ |
| id              | INT UNSIGNED  | Identificador único del hackathon          |
| organizerId     | INT UNSIGNED  | Id del organizador del hackathon           |
| name            | VARCHAR(100)  | Nombre del hackathon                       |
| logo            | VARCHAR(100)  | Logo del hackathon                         |
| description     | VARCHAR(1200) | Descripción del hackathon                  |
| requirements    | VARCHAR(1200) | Requisitos para participar en el hackathon |
| inscriptionDate | DATETIME      | Fecha de inicio del proceso de inscripción |
| inscriptionEnd  | DATETIME      | Fecha de fin del proceso de inscripción    |
| hackathonDate   | DATETIME      | Fecha de inicio del hackathon              |
| hackathonEnd    | DATETIME      | Fecha de fin del hackathon                 |
| maxParticipants | INT UNSIGNED  | Número máximo de participantes             |
| online          | ENUM          | Modalidad 'presencial' o 'remoto'          |
| location        | VARCHAR(200)  | Ubicación donde se realizará el hackathon  |
| prizes          | DECIMAL(9,2)  | Premios repartidos                         |
| documentation   | VARCHAR(100)  | Documentación adicional del hackathon      |
| createdAt       | DATETIME      | Fecha y hora de creación del hackathon     |
| updatedAt       | DATETIME      | Fecha y hora de la última modificación     |

### enrollsIn

| Campo           | Tipo             | Descripción                                           |
| --------------- | ---------------- | ----------------------------------------------------- |
| id              | INT UNSIGNED     | Identificador único de la inscripción                 |
| userId          | INT UNSIGNED     | Identificador del usuario de la inscripción           |
| hackathonId     | INT UNSIGNED     | Identificador del hackathon de la inscripción         |
| inscriptionDate | DATETIME         | Fecha de la inscripción                               |
| attended        | BOOLEAN          | Marcador de si el usuario participó en el hackathon\* |
| rating          | TINYINT UNSIGNED | Valoración que da el usuario al hackathon             |
| score           | INT UNSIGNED     | Puntuación que obtuvo el usuario en el hackathon      |
| createdAt       | DATETIME         | Fecha y hora de creación de la inscripción            |
| updatedAt       | DATETIME         | Fecha y hora de la última modificación                |

\*Puede darse el caso de que un usuario no participara en un hackathon pese a estar apuntado a el, por eso no es válido solo comprobar si está inscrito y la fecha del hackathon pasó

### themes

| Campo     | Tipo         | Descripción                            |
| --------- | ------------ | -------------------------------------- |
| id        | INT UNSIGNED | Identificador único del tema           |
| theme     | varchar(200) | Nombre de tema                         |
| createdAt | DATETIME     | Fecha y hora de creación del tema      |
| updatedAt | DATETIME     | Fecha y hora de la última modificación |

### hackathonThemes

| Campo       | Tipo         | Descripción                                              |
| ----------- | ------------ | -------------------------------------------------------- |
| id          | INT UNSIGNED | Identificador único de la asociación tema-hackahton      |
| hackathonId | INT UNSIGNED | Identificador de hackathon                               |
| themeId     | INT UNSIGNED | Identificador de tema                                    |
| createdAt   | DATETIME     | Fecha y hora de creación de la asociación tema-hackahton |
| updatedAt   | DATETIME     | Fecha y hora de la última modificación                   |

### technologies

| Campo      | Tipo         | Descripción                               |
| ---------- | ------------ | ----------------------------------------- |
| id         | INT UNSIGNED | Identificador único de la tecnología      |
| technology | varchar(200) | Nombre de la tecnología                   |
| createdAt  | DATETIME     | Fecha y hora de creación de la tecnología |
| updatedAt  | DATETIME     | Fecha y hora de la última modificación    |

### hackathonTechnologies

| Campo        | Tipo         | Descripción                                                    |
| ------------ | ------------ | -------------------------------------------------------------- |
| id           | INT UNSIGNED | Identificador único de la asociación tecnología-hackathon      |
| hackathonId  | INT UNSIGNED | Identificador de hackathon                                     |
| technologyId | INT UNSIGNED | Identificador de la tecnología                                 |
| createdAt    | DATETIME     | Fecha y hora de creación de la asociación tecnología-hackathon |
| updatedAt    | DATETIME     | Fecha y hora de la última modificación                         |

### userTechnologies

| Campo        | Tipo         | Descripción                                                  |
| ------------ | ------------ | ------------------------------------------------------------ |
| id           | INT UNSIGNED | Identificador único de la asociación tecnología-usuario      |
| userId       | INT UNSIGNED | Identificador del usuario                                    |
| technologyId | INT UNSIGNED | Identificador de la tecnología                               |
| createdAt    | DATETIME     | Fecha y hora de creación de la asociación tecnología-usuario |
| updatedAt    | DATETIME     | Fecha y hora de la última modificación                       |

## Endpoints de usuarios

- **POST** - ["/api/users/register"] - Crea un nuevo usuario. No requiere autenticación.

- **PUT** - ["/api/users/addOrganizer/:userId"] - Para que el administrador registre un organizador.

- **POST** - ["/api/users/organizers/request] - Solicitud al administrador para registrarse como organizador. No requiere autenticación.

- **PATCH** - ["/api/users/register/validate/:activationCode"] - Validar usuario con un código. No requiere autenticación.

- **POST** - ["/api/users/login"] - Logea un usuario ya creado. No requiere autenticación.

- **GET** - ["/api/users/"] - Devuelve el perfil del usuario. Sí requiere autenticación.

- **GET** - ["/api/users/getAllUsers"] - Devuelve el perfil de todos los usuarios. Solo administrador.

- **PUT** - ["/api/users/update"] - Actualizar perfil del usuario. Sí requiere autenticación.

- **PUT** - ["/api/users/password"] - Actualiza la contraseña. Sí requiere autenticación.

- **PUT** - ["/api/users/password/recover"] - Envía email con código de recuperación. No requiere autenticación.

- **PUT** - ["/api/users/password/recover/:recoverPassCode"] - Cambia la contraseña recuperada. No requiere autenticación.

- **DELETE** - ["/api/users/delete/:userId"] - Elimina los datos del usuario. Requiere autenticación.

## Endpoints de hackathons

- **GET** - ["/api/hackathons"] - Devuelve un listado de eventos de hackathons filtrados y/o ordenados por localización, estado, duración, preferencias. No requiere autenticación.

- **POST** - ["/api/hackathons"] - Añadir un evento de hackathon. Requiere autenticación de organizador.

- **PUT** - ["/api/hackathons/:hackathonId/update"] - Actualizar evento de hackathon. Requiere auntenticación de organizador.

- **GET** - ["/api/hackathons/:hackathonId"] - Devuelve información sobre un evento de hackathon. No requiere autenticación.

- **GET** - ["/api/hackathons/:hackathonId/enrollments"] - devuelve los inscritos de hackathon. Requiere autenticación.

- **POST** - ["/api/hackathons/:hackathonId/registration"] - Inscripción a un evento de hackathon. Requiere autenticación de desarrollador.

- **GET** - ["/api/hackathons/user/hackathons"] - Devuelve una lista de los eventos de hackathons en los que el usuario está registrado. Requiere autenticación de desarrollador.

- **DELETE** - ["/api/hackathons/:hackathonId/delete"] - Eliminar un hackathon. Requiere autenticación del organizador.

- **DELETE** - ["/api/hackathons/:hackathonId/cancel"] - Eliminar una inscripción hasta un límite máximo. Requiere autenticación del desarrollador.

- **PUT** - ["/api/hackathons/:hackathonId/rating"] - Rating 1-5 después de la fecha de realización. Requiere autenticación del desarrollador.

- **PUT** - ["/api/hackathons/:hackathonId/ranking"] - Clasificación de los participates después de cada competición. Requiere autenticación del organizador.

- **GET** - ["/api/maxParticipants"] - Devuelve el número máximo de plazas del hackathon que más plazas permite tener.

- **GET** - ["/api/maxPrize"] - Devuelve el premio máximo que se oferta entre todos los hackathons.

- **GET** - ["/api/technologies"] - Devuelve un listado de tecnologías de los hackathons. Ninguna autenticación.

- **GET** - ["/api/themes"] - Devuelve un listado de temas de los hackathons. Ninguna autenticación.
