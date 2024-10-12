import { removeFileUtil } from './index.js';

// Función que elimina una foto de la carpeta uploads.
const removePhotoUtil = async (imgName) => {
    if (
        imgName === 'default-avatar.png' ||
        imgName === 'default-hackathon-logo.svg '
    )
        return;
    removeFileUtil(imgName);
};

export default removePhotoUtil;
