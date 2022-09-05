const express = require('express');
const router = express.Router();
const path = require("path");
const checkUser = require("../middlewares/checkUser")

// CART CONTROLLER:
const cartController = require("../controllers/cartController");

router.get('/', checkUser, cartController.list);

router.post("/add/:id", checkUser, cartController.add);
router.delete('/:id/delete', cartController.delete);

router.get("/confirm", checkUser, cartController.startProces);

router.post("/checkout", checkUser, cartController.checkout)

module.exports = router;