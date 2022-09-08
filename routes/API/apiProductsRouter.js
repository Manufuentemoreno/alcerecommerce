const express = require("express");
const router = express.Router();
const path = require("path");

const apiProductsController = require('../../controllers/API/apiProductsController');

router.get('/', apiProductsController.list);

module.exports = router;