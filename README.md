# Hackathones

## Descripción

*Hackathones* es un proyecto web basado en **Node.js** y **React**. Se trata de una plataforma que muestra un calendario de eventos competitivos de programación a los visitantes, quienes podrán acceder a los detalles concretos de cada uno y realizar una búsqueda filtrada de los mismos según sus preferencias, así como comprobar los *rankings* de ganadores una vez concluyen. 

La web permite registro de usuarios, con rol a escoger entre **desarrolladores** y **organizadores**. Los desarrolladores podrán inscribirse como participantes en cuantos desafíos deseen, cancelar sus inscripciones dentro de los plazos establecidos y dejar valoraciones de 1 a 5 estrellas a los eventos en los que hayan participado. A su vez, los organizadores podrán añadir sus *hackathones* al calendario de la página, con los detalles, objetivos, premios, requerimientos, etc. Todos los usuarios registrados tendrán la posibilidad de gestionar y modificar sus perfiles a conveniencia.

## Instalación y ejecución

Para el *back-end*, junto con Node.js, se han utilizado el *framework* **Express** y la dependencia **Nodemon**, entre otros. Una vez clonado el repositorio, se ha de abrir una terminal y navegar hasta el directorio de la carpeta raíz del proyecto. A continuación, se ejecutará `npm install` para instalar automáticamente todas las dependencias necesarias. 

Para arrancar la base de datos ejecutaremos el comando `npm run initdb`; y para arrancar el servidor con Nodemon ejecutaremos `npm run dev`, el cual por defecto estará disponible en `http://localhost:3000`.  Se puede utilizar el archivo con la colección de peticiones de Postman incluido en el repositorio para comprobar los *end-points*.