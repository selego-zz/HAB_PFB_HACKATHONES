## En progreso

## Pendientes

- Los archivos de la carpeta utils deberían terminar todos en la palabra Util. Hay dos (exceptuando el index.js que no cumplen esa condición).
- En schemas no era necesario hacer el index.js del index.js. En controllers lo tenéis bien, tomadlo como ejemplo.
- El archivo verifyTokenUtil.js no puede ser un util porque está utilizando req, res y next. Solo podemos ubicar ese tipo de funciones en controllers o middlewares. En este caso se podría crear un util que recibiera como parámetro únicamente token y el tipo de rol, eso tendría más sentido.
- En la carpeta db tenéis el fichero initDb.js. En esa misma carpeta, dentro del fichero commonDBFunctions.js declaráis una función que se llama initDB. Eso puede causar confusión porque, por un lado, existe el archivo initDb.js y en un archivo distinto está declarada la función initDB
- import deleteUserController from './deleteUserController.js' y no import deleteUserController from './deleteuserController.js' (problema case sensitive en Linux)
- No se usa VITE_MAX_CANCELLATION_HOURS
- Si no se puede eliminar un admin quitaría el botón
- Cuando se actualiza un usuario, no devolver todos los datos de la tabla. ¡Devolvéis también la pwd criptada!
- Con DB vacio, si voy con admin en “Eventos” se hacen peticiones (maxPrice y maxParticipants) infinitas al Back
- La petición a “http://localhost:3000/api/hackathons/user/hackathons” devuelve el error {"status":"error","message":"Table 'BBB.enrollsin' doesn't exist"} Problema case sensitive
- En modifica perfil se hace una petición a http://localhost:3000/api/technologies que no se utilizan (soy admin)
- En la página del perfil se repiten las peticiones al Back. Lo mismo en gestión usuarios.
- En general revisar el número de las mismas peticiones que se hacen al Backend en las distintas páginas del Front
- No estaría mal implementar el preview del avatar.
- Añadir el botón para cancelar la operación de modifica hackaton y que permitiría volver al detalle
- Para el usuario que crea el hackaton el componente rating parece seleccionable
- No se puede ver en ningún sitio el documento que se sube cuando se crea el hackaton
- Se permite guardar las puntuaciones antes de la fecha de inicio evento
- ¡La primera vez que valoro un hackaton me dice si quero cambiar la valoración!
- En la parte configuración de la parte de cliente en el readme se habla del puerto, pero no coincide con la realidad
- El rating medio del hakaton solo puede verlo el usuario organizador en historial. Tendría que verlo todo el mundo (en el listado hackatones y en el detalle)
- Hay casos (ej: fallo en la valoración, “Lo sentimos, el plazo de inscripción ya ha pasado”) en los que NO se avisa el usuario con un mensaje de error
- Como usuario no entiendo como se aplican los filtros en la búsqueda (si tengo que dar siempre al botón buscar siempre o no). Mejorar
- Los sliders del menu de filtros están descentrados
- No se pueden resetear los filtros de búsqueda (fechas)
- Habría que darle una vuelta al diseño del listado para pantallas pequeñas, el menú de filtros ocupa demasiado
- En general, implementar más controles y mejorar la usabilidad. Por ejemplo, un usuario puede cancelar la inscripción a un hackathon pasado
- Para un hackaton faltan los datos: número max inscriptos y los inscriptos actuales. Pondría también el nombre del organizador (podría ser una empresa que me interesa)
- Si hay menos de 3 inscriptos la página donde está el historial da error
- En un comentario se dice que updateUserModel recibe un JSON, no. Recibe un objeto JS
- Habría implementado la creación de un usuario organizador y desarrollador en el mismo endpoint para evitar de duplicar código y no tener que hacer peticiones distintas en el Front
- Implementar Joi en todos los endpoints
- No window.location.reload() en React, es sinónimo de fallo (esto recarga toda la página). Actualizar el componente con un cambio de estado.
- No guardaría estas funciones (registerUser, loginUser, updateUser, updateUserWithAvatar, updatePassword) en el contexto, no es necesario. Además algunas se repiten en otros sitios. Ej: la petición de login (/user/login) se repite en la página login. DRY
- El ancho de las cards en versión móvil se ajusta al que tenga la ubicación más larga. Esto hace que cuando se hace hover sobre ella todos los demás crezcan (”bailan”)
- Uso de Tailwind
- Bien la organización del código

## Finalizadas

~~- Pondría “z-extras-DER_postman” en Server~~

~~- En el readme se repite dos veces “Instalación de la parte del servidor” en una sería “Instalación de la parte del client”. Además, falta: inicialización DB (npm run initdb), creación directorio uploads con avatar de default y img hackaton default, hablar de initdummydb ...~~

~~- Dejar en .env.example los datos para DB_THEMES y DB_TECHNOLOGIES (para saber lo que poner tengo que mirar el código). Esto también para otros datos no sensibles/privados (tanto en el Front como en el Back). Otro ejemplo: en el .env del front hay que añadir “/api” al final de la ruta del back para que funcione~~

~~- El usuario admin se crea con default-avatar.png que no veo en el filesystem~~

~~- Las imágenes de avatar y hackaton de default las pondría en public del Front y en el DB no guardaría nada. Ejemplo: cuando creo un usuario en el campo avatar no pongo nada y si el Front no recibe el avatar usa lo de default.~~

~~- initdummydb da error si no se añaden suficientes temas y tecnologías en .env~~
