const { body } = require('express-validator');
const userRegisterValidation = [
    body('email').notEmpty().withMessage('El campo email no puede quedar vacío.'),
    body('password').notEmpty().withMessage('La contraseña no puede quedar vacía.'),
    body('confirmPassword').notEmpty().withMessage('Debe confirmar la contraseña.'),
    body('category').notEmpty().withMessage('El campo categoría no puede quedar vacío.'),
    body('name').notEmpty().withMessage('Debe completar su nombre.'),
    body('last_name').notEmpty().withMessage('Debe completar su apellido.'),
    body('birth_date').notEmpty().withMessage('Debe completar su fecha de nacimiento.')
];

module.exports = userRegisterValidation;