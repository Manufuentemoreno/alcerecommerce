const express = require('express');
const router = express.Router();
const path = require("path");
const checkUser = require("../middlewares/checkUser")

// CART CONTROLLER:
const cartController = require("../controllers/cartController");
const { cart } = require('../controllers/mainController');

router.get('/', checkUser, cartController.list);

router.post("/add/:id", checkUser, cartController.add);
router.delete('/:id/delete', cartController.delete);
router.put('/:id/addOne', cartController.addOne);
router.put('/:id/removeOne', cartController.removeOne);

router.get("/confirm", checkUser, cartController.startProces);

router.put("/checkout", checkUser, cartController.checkout),
router.post('/checkoutMP', cartController.checkoutMP);

router.get("/success", cartController.success);
router.get("/failure", cartController.failure);

router.get("/added", cartController.added);

module.exports = router;