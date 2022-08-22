const express = require("express");
const router = express.Router();
const productsRouter = require("./products-router");

const mainController = require("../controllers/mainController");
const authRouter = require('./auth');
const usersRouter = require('./users');

router.get("/", mainController.home);

router.use("/products", productsRouter);

router.get("/carrito", mainController.cart);

router.use(authRouter);
router.use(usersRouter);

module.exports = router;