const express = require("express");
const router = express.Router();
const path = require("path");

const apiProductsController = require('../../controllers/API/apiProductsController');

router.get('/', apiProductsController.index);
router.get('/:id', apiProductsController.detail);

module.exports = router;