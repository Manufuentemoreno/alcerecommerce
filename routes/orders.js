const express = require("express");
const router = express.Router();

const ordersController = require("../controllers/ordersController");

// Middlewares
const checkUser = require("./../middlewares/checkUser");
const checkAdmin = require("../middlewares/checkAdmin");

// File upload Img
const fileUpload = require("../middlewares/multer-save-userImages");

router.get('/takeAway', checkUser, checkAdmin, ordersController.ordersTakeAway);
router.put('/:id/listo', ordersController.updateListo);
router.put("/:id/retirado", ordersController.updateRetirado);
router.put("/:id/vueltaAtras", ordersController.updateBackToProcess);
router.get('/detail/:id', ordersController.detail);
router.delete('/:id/delete', ordersController.orderDelete);

module.exports = router;