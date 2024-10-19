import { initDB, initAdmin } from './commonDBFunctions.js';

//////
const init = async () => {
    await initDB();
    await initAdmin();
    console.log('¡Proceso finalizado!');
    process.exit(0);
};
init();
export { initDB, initAdmin };
