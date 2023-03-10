const express = require('express');
const router = express.Router();
const path = require('path');

const usersController = require('../controllers/usersController');

// Middlewares
const checkUser = require('./../middlewares/checkUser');
const checkAdmin = require('../middlewares/checkAdmin');

// File upload Img
const fileUpload = require("../middlewares/multer-save-userImages");

router.get('/users', checkUser, checkAdmin, usersController.list);
router.get('/users/edit/:id', checkAdmin, usersController.edit);
router.put('/users/update/:id', fileUpload.single('profil_photo'), usersController.update);

module.exports = router;