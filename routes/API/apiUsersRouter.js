const express = require('express');
const router = express.Router();
const path = require("path");

const apiUsersController = require('../../controllers/API/apiUsersController');

router.get('/', apiUsersController.index);
router.get('/:id', apiUsersController.detail);

module.exports = router;