import { addOrganizerModel } from '../../models/index.js';
import { generateErrorUtil } from '../../utils/index.js';

const addOrganizerController = async (req, res, next) => {
    try {
        const { username, email, password, firstName, lastName } = req.body;

        // Validar datos
        if (!username || !email || !password || !firstName || !lastName) {
            generateErrorUtil('Todos los campos son obligatorios', 400);
        }

        // Crear el organizador
        await addOrganizerModel(username, email, password, firstName, lastName);

        res.status(201).send({
            status: 'ok',
            message: 'Organizador registrado con éxito.',
        });
    } catch (err) {
        next(err);
    }
};

export default addOrganizerController;
