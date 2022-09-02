const express = require('express');
const router = express.Router();
const path = require("path");

// CART CONTROLLER:
const cartController = require("../controllers/cartController");

router.get('/', cartController.list);

router.post("/add/:id", cartController.add);
router.delete('/:id/delete', cartController.delete);


module.exports = router;