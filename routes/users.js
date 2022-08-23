const express = require('express');
const router = express.Router();
const path = require('path');

const usersController = require('../controllers/usersController');

// File upload Img
const fileUpload = require("../middlewares/multer-save-userImages");

router.get('/users', usersController.list);
router.get('/users/edit/:id', usersController.edit);
router.put('/users/update/:id', fileUpload.single('profil_photo'), usersController.update);

module.exports = router;