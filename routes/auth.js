const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');

const authController = require('../controllers/authController');

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
router.post('/register', fileUpload.single('profilePhoto'), authController.register);
router.get('/login', authController.showLogin);

module.exports = router;