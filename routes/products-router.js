const express = require('express');
const router = express.Router();
const path = require("path");

// Middleware para cheuear si es usuario admin y si está logueado
const checkAdmin = require("../middlewares/checkAdmin");
const isLogged = require("../middlewares/checkIsLogged");

// multer para manejo de imagenes
const upload = require("../middlewares/multer-save-productImages");

// express validator
const validations = require("../middlewares/products-validation");

// PRODUCT CONTROLLER 
const productsController = require('../controllers/productController');

// GET ALL PRODUCTS
router.get('/', productsController.index); 

// SEARCH PRODUCT
router.get("/search/", productsController.search);

// CREATE ONE PRODUCT
router.get('/create',isLogged,checkAdmin, productsController.create); 
router.post('/create',isLogged,checkAdmin, upload.single("product_photo"), validations , productsController.store); 

// GET ONE PRODUCT
router.get('/:id/', productsController.detail); 

// EDIT ONE PRODUCT
router.get('/edit/:id/',isLogged,checkAdmin, productsController.edit); 
router.put('/edit/:id/',isLogged,checkAdmin, productsController.update);

// DELETE ONE PRODUCT
router.delete('/delete/:id',isLogged,checkAdmin, productsController.destroy);

// Products route not found
router.get("/:x", productsController.notFound);
router.get("/create/:x", productsController.notFound);
router.get("/search/:x", productsController.notFound);

module.exports = router;
