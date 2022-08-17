const express = require('express');
const router = express.Router();
const path = require('path');

const authController = require('../controllers/authController');

// User Validation
const userRegisterValidation = require("../middlewares/user-register-validation");

// File upload Img
const fileUpload = require("../middlewares/multer-save-userImages");

router.get('/register', authController.showRegister);
router.post('/register', fileUpload.single('profil_photo'), userRegisterValidation, authController.register);
router.get('/login', authController.showLogin);
router.post('/login', authController.login);
router.get('/logout', authController.logout);

module.exports = router;