const express = require("express");
const router = express.Router();
const productsRouter = require("./products-router");
const cartRouter = require('./cart-router');

const mainController = require("../controllers/mainController");
const authRouter = require('./auth');
const usersRouter = require('./users');

const checkUser = require('../middlewares/checkUser');

router.get("/", mainController.home);

router.use("/products", productsRouter);

// router.use("/cart",checkUser, cartRouter);
router.use("/cart", cartRouter);

router.use(authRouter);
router.use(usersRouter);

router.get("/:x", mainController.notFound)

module.exports = router;