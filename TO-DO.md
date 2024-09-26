lo pongo aquí no en notion por que es algo que hay que hablar.

Si necesitamos un código consistente, tenemos que darle un poco de mejor forma a los nombres de los archivos:

Todo lo que inserte a la base de datos que empiece por lo mismo. Yo voto por add, pero aceptaría lo que queráis...

sin embargo tenemos:
createHackathonInscriptionModel, insertHackathonModel, addHackathonController y newUserController, que son 5 formas diferentes de llamarlo... Si rateHackathonController entra en este saco serían 6 modos diferentes. He puesto un ejemplo de cada comienzo pero hay varias de cada que se llaman así

con respecto a las actualizaciones de la base de datos. Voto por update.

tenemos
updateHackathonController, changePassController, 2 formas diferentes que yo haya visto

con respecto a las lecturas de la base de datos voto por get

tenemos
selectUserByEmailModel, getHackathonByIdModel, 2 formas diferentes que yo haya visto

---

OJO:

addScoreController
tal cual está cualquier organizador que sepa el id del hackaton y del usuario puede puntuar. hay que comprobar que el organizador es el usuario del token.
Sobre todo: Es un update: no hay que devolver status 201

insertScoreModel
no es un insert. la línea ya existe en la tabla desde el momento en que el usuario se inscribe a la base de datos.
id, userId, hackathonId, inscriptionDate,  
 attended, rating, score,
createdAt, updatedAt,
hay que hacer un update. no hace falta hacer un select por si está puntuado. una nueva puntuación sobrescribe la anterior, Tampoco hace falta hacer un select para ver si el usuario se apuntó al hackathon, se incluye en el where como mucho habría que comprobar si fue al evento, lo cual tampoco requiere un select, tambiénpodemos hacerlo directamente en el where:
update enrollsIn set score = ? where userId = ? and hackathonId = ? and attended = true
a mayores, no se devuelve nada, sin embargo el controlador espera una respuesta
lo que devuelve el update (o el insert) es un json con muchos campos inutiles. excepto: affectedRows (y en el caso del insert el id de la nueva línea)

rateHackathonController
insertRatingModel
corregí importaciones. Pero el mayor problema de estos 2 es el mismo que el anterior:
no es un insert. la línea ya existe en la tabla desde el momento en que el usuario se inscribe a la base de datos.
id, userId, hackathonId, inscriptionDate,  
 attended, rating, score,
createdAt, updatedAt,
hay que hacer un update. no hace falta hacer un select por si está puntuado. una nueva puntuación sobrescribe la anterior, Tampoco hace falta hacer un select para ver si el usuario se apuntó al hackathon, se incluye en el where como mucho habría que comprobar si fue al evento, lo cual tampoco requiere un select, tambiénpodemos hacerlo directamente en el where:
update enrollsIn set rating = ? where userId = ? and hackathonId = ? and attended = true

createHackathonInscriptionController
El usuario debería ser el que viene con el token no? si ponemos el del token hay que borrar la línea de userid del schema

hackathonEnrollController
puede ser que sea lo mismo que createHackathonInscriptionController???

newUserController
Permitimos subir avatar en la creación del usuario?

updateUserController:
mejor extraer la función de savePhotoUtil para reaprovecharla en otras partes?
habría que borrar el avatar anterior con removePhotoUtil?
