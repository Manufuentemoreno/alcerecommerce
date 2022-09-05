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
            .catch(error => res.send(error))
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
            res.render("create", { "errors" : errors.mapped(), "oldData" : req.body });
            return 
        }
        
        const newProduct = req.body;
        
        newProduct.stock = Number(newProduct.stock);
        newProduct.price = Number(newProduct.price);
        newProduct.category_id = Number(newProduct.category_id);
        newProduct.product_photo = req.file.filename;
        newProduct.special_offer ? newProduct.special_offer = 1 : newProduct.special_offer = 0;
                
        await Products.create(newProduct);

        res.redirect("/products");
    },

    edit: (req, res) =>{
        Products.findByPk(req.params.id)
            .then(productToEdit => {
                res.render("edit", { product: productToEdit })
            })
            .catch(error => res.send(error))
    },

    update: async(req, res) => {
        const productEdited = req.body;
        const idP = req.params.id;

        await Products.update({
            name: productEdited.name,
            price: Number(productEdited.price),
            description: productEdited.description
        },{
            where: {id: idP}
        })
        .catch(error => res.send(error))
        
        res.redirect("/products");
    
    },

    destroy: (req, res) => {
        if ( req.body.sure ) {
            Products.destroy({
                where: {
                    id: req.params.id}
            });

            res.redirect("/products");
        }

        res.redirect("/products");
    },

    search: (req, res) => {
        let searched = req.query.producto;
        Products.findAll({
            where: {name: {[Op.like]: `%${searched}%` }}
        })
            .then(productsList =>{
                res.render("search", { products: productsList, searched: searched})
            })
            .catch(error => res.send(error))
    },
};

module.exports = controller;