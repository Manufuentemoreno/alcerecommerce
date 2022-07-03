const express = require("express");
const router = express.Router();
const productsRouter = require("./products-router");

const mainController = require("../controllers/mainController");
const authRouter = require('./auth');

router.get("/", mainController.home);

router.use("/product", productsRouter);

router.get("/carrito", mainController.cart);

router.use(authRouter);

module.exports = router;