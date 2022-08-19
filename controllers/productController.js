const path = require("path");
const db = require('../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");

// Modelos
const Products = db.Products;
const Category = db.Products_categories;

// Validations-express validator
const { validationResult } = require("express-validator");

const controller = {
    index: (req, res) => {
        Products.findAll({
            include: [{association: 'products_categories'}]
        })
            .then(productsList =>{
                res.render("products", { products: productsList })
            })
    },

    detail: (req, res) => {
        Products.findByPk(req.params.id)
        .then(producto => {res.render("productDetail", {product: producto} )})
    },
    
    create: (req, res) => {
        res.render("create");
    },

    store: async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()){
            res.render("create", { "errors" : errors.mapped(), "oldData" : req.body })
        }

        const newProduct = req.body;
        
        newProduct.price = Number(newProduct.price);
        newProduct.product_photo = req.file.filename;
        newProduct.special_offer ? newProduct.special_offer = 1 : newProduct.special_offer = 0;
        
        let resultado = await Category.findOne({
            where: {
                name: newProduct.category
            } 
        })
        
        newProduct.category_id = await resultado.id;

        delete newProduct.category;
        
        await Products.create(newProduct);

        res.redirect("/products");

    },

    edit: (req, res) =>{
        Products.findByPk(req.params.id)
            .then(productToEdit => {
                res.render("edit", { product: productToEdit } )
            })
    },

    update: (req, res) => {},

    destroy: (req, res) => {},
};

module.exports = controller;