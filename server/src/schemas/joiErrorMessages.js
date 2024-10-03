//////////////////////////////////////////////////////////////
// JSON con los posibles mensjaes de error de Joi,
// para ponerlos en español.
// Los que no se definan aquí saltarán en inglés
/////////////////////////////////////////////////////////////

const joiErrorMessages = {
    'any.required': 'El campo "{#key}" es requerido',
    'any.only':
        'El rol debe ser uno de los siguientes valores: administrador, organizador, desarrollador',
    'string.base': 'El valor de "{#key}" debe ser una cadena',
    'string.empty': 'El campo "{#key}" no debe estar vacío',
    'number.base': 'El valor de "{#key}" debe ser un número',
    'object.base': 'El valor de "{#key}" debe ser un objeto',
    'string.email':
        'Debe proporcionar un correo electrónico válido para "{#key}"',
    'string.min': 'El campo "{#key}" debe tener al menos {#limit} caracteres',
    'string.max': 'El campo "{#key}" no debe exceder los {#limit} caracteres',
    'date.base': 'El valor de "{#key}" debe ser una fecha válida',
    'object.unknown': 'No se permiten campos adicionales en este objeto',
};

export default joiErrorMessages;
