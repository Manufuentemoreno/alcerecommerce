const path = require('path');
const { body } = require('express-validator');
const userRegisterValidation = [
    body('email')
        .notEmpty().withMessage('El campo email no puede quedar vacío.').bail()
        .isEmail().withMessage('El email debe tener un formato válido.'),
    body('password')
        .notEmpty().withMessage('La contraseña no puede quedar vacía.').bail()
        .isLength({min: 8}).withMessage('La contraseña debe tener al menos 8 caracteres.'),
    body('category').notEmpty().withMessage('El campo categoría no puede quedar vacío.'),
    body('name')
        .notEmpty().withMessage('Debe completar su nombre.').bail()
        .isLength({min: 2}).withMessage('El nombre debe tener al menos 2 caracteres.'),
    body('last_name')
        .notEmpty().withMessage('Debe completar su apellido.').bail()
        .isLength({min: 2}).withMessage('El apellido debe tener al menos 2 caracteres.'),
    body('birth_date').notEmpty().withMessage('Debe completar su fecha de nacimiento.'),
    
    body('profile_photo').custom((value, { req }) => {
        if (!value) {
            return true;
        } else {
            let file = req.file;
            let extensionsOk = [".jpg", ".jpeg", ".png", ".webp"];
            let fileExtension = path.extname(file.originalname);
            if (!extensionsOk.includes(fileExtension)) {
                throw new Error("Seleccione un archivo " + extensionsOk.join(" - ") + '.');
            }
        }
        
    })
];

module.exports = userRegisterValidation;