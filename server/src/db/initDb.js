import { initCommonDB, initAdmin } from './commonDBFunctions.js';

//////
const init = async () => {
    await initCommonDB();
    await initAdmin();
    console.log('¡Proceso finalizado!');
    process.exit(0);
};
init();
export { initCommonDB, initAdmin };
