const express = require('express');
const router = express.Router();
const path = require("path");
const checkUser = require("../middlewares/checkUser")

// CART CONTROLLER:
const cartController = require("../controllers/cartController");

router.get('/', checkUser, cartController.list);

router.post("/add/:id", checkUser, cartController.add);
router.delete('/:id/delete', cartController.delete);
router.put('/:id/addOne', cartController.addOne);
router.put('/:id/removeOne', cartController.removeOne);

// router.get("/confirm", checkUser, cartController.startProces);
router.get("/confirm", cartController.startProces); // sin checkuser para preparar formulario

router.post("/checkout", checkUser, cartController.checkout)

router.get("/added", cartController.added);

module.exports = router;