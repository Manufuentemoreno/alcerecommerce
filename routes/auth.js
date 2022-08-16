const express = require('express');
const router = express.Router();
const path = require('path');
const { body } = require('express-validator');
const multer = require('multer');

const authController = require('../controllers/authController');

const userRegisterValidation = [
    body('email').notEmpty().withMessage('El campo email no puede quedar vacío.'),
    body('password').notEmpty().withMessage('La contraseña no puede quedar vacía.'),
    body('confirmPassword').notEmpty().withMessage('Debe confirmar la contraseña.'),
    body('category').notEmpty().withMessage('El campo categoría no puede quedar vacío.'),
    body('name').notEmpty().withMessage('Debe completar su nombre.'),
    body('last_name').notEmpty().withMessage('Debe completar su apellido.'),
    body('birth_date').notEmpty().withMessage('Debe completar su fecha de nacimiento.')
]

let multerDiskStorage = multer.diskStorage({
    destination: (req, file, callback) => {
        let folder = path.join(__dirname, '../public/images/profile');
        callback(null, folder);
    },
    filename: (req, file, callback) => {
        let imageName = Date.now() + path.extname(file.originalname);
        callback(null, imageName);
    }
})

fileUpload = multer({ storage: multerDiskStorage});

router.get('/register', authController.showRegister);
router.post('/register', fileUpload.single('profil_photo'), userRegisterValidation, authController.register);
router.get('/login', authController.showLogin);
router.post('/login', authController.login);
router.get('/logout', authController.logout);

module.exports = router;