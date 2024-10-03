import path from 'path';
import fs from 'fs/promises';
import { generateErrorUtil } from './index.js';

/**
 * Función que guarda un archivo en la carpeta uploads/files
 * @param {File} file - archivo para ser guardado.
 * @description - comprueba que exista la carpeta uploads, en caso contrario la crea, graba el archivo con un nombre aleatorio, y devuelve el nombre
 * @returns {string} Devuelve el nombre con el que se ha grabado al imagen en la carpeta uploads
 */

//////

const saveFileUtil = async (file) => {
    try {
        // Generamos la ruta absoluta al directorio de subida de archivos.
        const uploadsPath = path.join(process.cwd(), process.env.UPLOADS_DIR);

        // Generamos un nombre de archivo aleatorio para que no haya conflictos de nombres
        const fileName =
            `${crypto.randomUUID()}` + extractFileExtension(file.name);
        // Generamos la ruta completa donde se grabará el archivo
        const filePath = path.join(uploadsPath, fileName);

        try {
            // Comprobamos si existe el directorio de subida de archivos.
            await fs.access(uploadsPath);
        } catch {
            // Si "access" lanza un error quiere decir que el directorio no existe. Lo creamos.
            await fs.mkdir(uploadsPath);
        }

        //grabamos el archivo
        await file.mv(filePath);

        return fileName;
    } catch (err) {
        console.error(err);

        generateErrorUtil('Error al guardar el archivo en disco', 500);
    }
};

/**
 * Función que recibe un nombre de archivo y devuelve la extensión del archivo
 * @param {string} fileName - archivo cuya extensión buscamos.
 * @returns {string} Devuelve la extensión (con el . antes de ella incluído) del archivo cuyo nombre se suministra con el que se ha grabado al imagen en la carpeta uploads, si no tuviera extensión, devuelve una cadena vacía
 */
const extractFileExtension = (fileName) => {
    // se podía hacer en una sola línea, pero quería controlar lo que se devuelve
    const index = fileName.lastIndexOf('.');
    return index > 0 ? fileName.slice(index) : '';
};

export default saveFileUtil;
