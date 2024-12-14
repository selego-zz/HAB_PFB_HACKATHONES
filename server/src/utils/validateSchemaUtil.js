//no importamos generate error, vamos a aprovechar el error que da el catch, que ya debería tener nuestras frases personalizadas

//////////////////////////////////////////////////////////////
// Función que valida unos datos comparándolos con un esquema
// recibe: el esquema con el que comparar,
//         y los datos que necesitamos saber si se ajustan al equema
// no devuelve nada
// lanza una excepción si los datos no se ajustan al esquema
///////////////////////////////////////////////////////////

const validateSchemaUtil = async (schema, data) => {
    try {
        await schema.validateAsync(data);
    } catch (err) {
        err.httpStatus = 400;
        throw err;
    }
};

export default validateSchemaUtil;
