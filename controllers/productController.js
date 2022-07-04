const fs = require("fs");
const path = require("path");
const Products = require("../models/Products");


// Validations-express validator
const { validationResult } = require("express-validator");

const controller = {
    index: (req, res) => {
        res.render("products", { products: Products.getData()});
    },

    detail: (req, res) => {
        res.render("productDetail", { product: Products.getData().find(product =>
            product.id == req.params.id)});
    },

    create: (req, res) => {
        res.render("create");
    },

    store: (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()){
            res.render("create", { "errors" : errors.mapped(), "oldData" : req.body })
        }
        else{
            const newProduct = req.body;
            const allProduct = Products.getData();

            newProduct.img = req.file.filename;
            if (allProduct.length) {
                newProduct.id = allProduct[allProduct.length - 1].id+1}
            else{newProduct.id = 1}
        
            newProduct.price = Number(newProduct.price);

            newProduct.preciosCuidados ? newProduct.preciosCuidados = true : newProduct.preciosCuidados = false;

            Products.saveData(newProduct);

            res.redirect("/products");
        }
    },

    edit: (req, res) => {
        let productToEdit = Products.editId( req.params.id);

        console.log(productToEdit);

        res.render("edit", { product: productToEdit });
    },

    update: (req, res) => {
        const editedNew = req.body;
        const db = Products.getData();

        let indexOfEdited = db.findIndex( prod => prod.id == req.params.id );

        let originalProd = db[indexOfEdited];
        
        if( editedNew.productName && editedNew.productName != originalProd.productName ) {
            originalProd.productName = editedNew.productName
        }
        if( editedNew.description && editedNew.description != originalProd.description ) {
            originalProd.description = editedNew.description
        }
        if( editedNew.price && editedNew.price != originalProd.price ) {
            originalProd.price = editedNew.price
        }
        if( editedNew.preciosCuidados != originalProd.preciosCuidados ) {
            if (editedNew.preciosCuidados){
                originalProd.preciosCuidados = true;
            }else{originalProd.preciosCuidados = false;}}
                
        db.splice(indexOfEdited,1,originalProd)        

        productsList =  JSON.stringify(db, null, 4);
        fs.writeFileSync( Products.fileName, productsList );
        
        res.redirect("/products")
    },

    destroy: (req, res) => {
        if ( req.body.sure ) {
            Products.delete(req.params.id);

            res.redirect("/products");
        }

        res.redirect("/products");
    }
};

module.exports = controller;