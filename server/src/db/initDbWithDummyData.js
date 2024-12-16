import 'dotenv/config';
import addDummyData from './dummyData.js';
import { initCommonDB, initAdmin } from './commonDBFunctions.js';
//////

////////////////////////////////////////////////////
// Función que genera las tablas en la base de datos
// también crea el usuario administrador
// no recibe parámetros
// no devuelve nada
////////////////////////////////////////////////////
const initDbWithDummyData = async () => {
    try {
        await initCommonDB();
        console.log('Insertando dummy data');
        await addDummyData();
        console.log('Dummy data insertada');
        await initAdmin();
        console.log('Proceso finalizado');

        //falta añadir tecnologías y temáticas.... que diferencia hay entre una y otra? añadimos unas pocas? añadimos un montón?....

        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

initDbWithDummyData();

export default initDbWithDummyData;
