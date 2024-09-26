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
