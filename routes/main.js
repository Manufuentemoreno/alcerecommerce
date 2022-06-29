const express = require("express");
const router = express.Router();

const mainController = require("../controllers/mainController");
const authRouter = require('./auth');

router.get("/", mainController.home);
router.get("/producto/:id?", mainController.product);
router.get("/carrito", mainController.cart);

router.use(authRouter);

module.exports = router;