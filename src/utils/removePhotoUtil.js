import { removeFileUtil } from './index.js';

// Función que elimina una foto de la carpeta uploads.
const removePhotoUtil = async (imgName) => {
    removeFileUtil(imgName);
};

export default removePhotoUtil;
