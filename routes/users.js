const express = require('express');
const router = express.Router();
const path = require('path');

const usersController = require('../controllers/usersController');

router.get('/users', usersController.list);
router.get('/users/edit/:id', usersController.edit);

module.exports = router;