const express = require('express');
const router = express.Router();
const path = require("path");

// multer para manejo de imagenes
const upload = require("../middlewares/multer-save-productImages");

// express validator:
const validations = require("../middlewares/products-validation");

// PRODUCT CONTROLLER 
const productsController = require('../controllers/productController');

// GET ALL PRODUCTS
router.get('/', productsController.index); 

// CREATE ONE PRODUCT
router.get('/crear', productsController.create); 
router.post('/crear', upload.single("img"), validations , productsController.store); 


// GET ONE PRODUCT
router.get('/:id/', productsController.detail); 

// EDIT ONE PRODUCT
router.get('/edit/:id/', productsController.edit); 
router.post('/edit/:id/', productsController.update); 


// DELETE ONE PRODUCT
router.post('/delete/:id', productsController.destroy); 

module.exports = router;
