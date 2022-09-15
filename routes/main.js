const express = require("express");
const router = express.Router();
const productsRouter = require("./products-router");
const cartRouter = require('./cart-router');
const ordersRouter = require('./orders');

const mainController = require("../controllers/mainController");
const authRouter = require('./auth');
const usersRouter = require('./users');

const checkUser = require('../middlewares/checkUser');

const apiProductsRouter = require('./API/apiProductsRouter');
const apiUsersRouter = require('./API/apiUsersRouter');

router.get("/", mainController.home);

router.use("/products", productsRouter);
router.use('/orders', ordersRouter);

// router.use("/cart",checkUser, cartRouter);
router.use("/cart", cartRouter);

router.use(authRouter);
router.use(usersRouter);

router.get("/:x", mainController.notFound)
router.post("/:x", mainController.notFound)

// --- APIs --- 
router.use('/api/products', apiProductsRouter);
router.use('/api/users', apiUsersRouter);
// --- fin de APIs ---

module.exports = router;