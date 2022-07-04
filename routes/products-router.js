const express = require('express');
const router = express.Router();
const path = require("path");

// multer para manejo de imagenes
const multer = require("multer");
const saveImage = multer.diskStorage({ 

    destination: (req, file, cb) => {
        const pathName = path.join(__dirname, "./../public/images/productDetail");
        cb(null, pathName);
    },
    
    filename: (req, file, cb) => {
        const imagName = "img-" + Date.now() + "-" + req.body.productName + path.extname(file.originalname);
        cb(null, imagName);
    }
});
const upload = multer({ storage : saveImage });

// express validator:
const { body } = require("express-validator");
const validations = [
    body("productName").notEmpty().withMessage("* Campo Obligatorio"),
    body("price").notEmpty().withMessage("* Campo Obligatorio"),
    body("category").notEmpty().withMessage("* Se necesita seleccionar una categoría"),
    body("description").notEmpty().withMessage("* Campo Obligatorio"),
    body("img").custom((value, { req }) => {
        let file = req.file;
        let extensionsOk = [ ".jpg", ".jpeg", ".png", ".webp" ];

        if (!file) {
            throw new Error( "Es necesario seleccionar una imagen" );
        }else{
            let fileExtension = path.extname(file.originalname);
            if (!extensionsOk.includes(fileExtension)) {
                throw new Error ("Seleccioná un archivo "+extensionsOk.join(" - "));
            }
        }

        return true
    })
];

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
router.get('/delete/:id', productsController.destroy); 

module.exports = router;
