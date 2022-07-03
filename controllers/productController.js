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

            res.redirect("/product");
        }
    },

    edit: (req, res) => {
        res.render("delete");
        ("editando producto +"+ req.params.id)
    },

    update: (req, res) => {},

    destroy: (req, res) => {
        res.render("edit");
        res.send("eliminando XX producto +"+ req.params.id)
    }
};

module.exports = controller;