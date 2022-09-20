const path = require("path");
const db = require('../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");

// Modelos
const Products = db.Products;
const Category = db.Products_categories;
const categoryList = require('../modules/productCategoryTopBar');
const cartProducts = require("../modules/cartProductSide");

// Validations-express validator
const { validationResult } = require("express-validator");
let lastAdded = ""

const controller = {
    index: async(req, res) => {
        let categories = await categoryList();
        let productsList = []
        try {
            productsList = await Products.findAll({
            include: [{association: 'products_categories'}]})
        }catch(error){
            return res.send(error)
        }

        // cart section:
        let detalles = await cartProducts(req, res);

        //lastAdded:
        if(req.session.addedProductId 
            && lastAdded == req.session.addedProductId){
                lastAdded = "" 
        }else{
            lastAdded = req.session.addedProductId;
        }
        
        req.session.addedProductId = "";
        res.render("products", { products: productsList, categories, title: "Nuestros Productos", detalles, lastAdded });
    },

    detail: async (req, res) => {
        let producto = await Products.findByPk(req.params.id)
        let categories = await categoryList();
        
        //lastAdded:
        if(req.session.addedProductId 
             && lastAdded == req.session.addedProductId){
                lastAdded = "" 
        }else{
            lastAdded = req.session.addedProductId;
        }
        req.session.addedProductId = "";

        if (producto){
            return res.render("productDetail", {product: producto, categories, lastAdded} )}
        res.render("notFound");
    },

    category: async(req, res) =>{
        let catSelected = req.params.category;
        let categories = await categoryList();
        const selection = await Category.findOne({where:{name: catSelected}});
        let products = await Products.findAll({where:{category_id: selection.id}});

        // cart section:
        let detalles = await cartProducts(req, res);

        //lastAdded:
        if(req.session.addedProductId 
            && lastAdded == req.session.addedProductId){
                lastAdded = "" 
        }else{
            lastAdded = req.session.addedProductId;
        }
        
        req.session.addedProductId = "";
        res.render("products", {products, categories, title: `Productos en ${catSelected}`, detalles, lastAdded});
    },
    
    create: async(req, res) => {
        let categories = await categoryList();
        res.render("create", {categories});
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

    edit: async(req, res) =>{
        const product = await Products.findByPk(req.params.id)
        let categories = await categoryList();

        res.render("edit", { product, categories });
    },

    update: async(req, res) => {
        const productEdited = req.body;
        const idP = req.params.id;

        await Products.update({
            name: productEdited.name,
            price: Number(productEdited.price),
            description: productEdited.description,
            category_id: Number(productEdited.category)
        },{
            where: {id: idP}
        })
        
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

    search: async(req, res) => {
        let categories = await categoryList();
        let searched = req.query.producto;

        let productsList = []
        try{
            productsList = await Products.findAll({
            where: {
                name: {[Op.like]: `%${searched}%` }
            }})
        }catch(error){
            return res.render("notFound")
        }

        console.log(productsList)

        //lastAdded:
        if(req.session.addedProductId 
            && lastAdded == req.session.addedProductId){
                lastAdded = "" 
        }else{
            lastAdded = req.session.addedProductId;
        }
        
        req.session.addedProductId = "";
        res.render("search", { products: productsList, searched: searched, categories, lastAdded})
    },

    notFound: async(req,res) =>{
        let categories = await categoryList();
        res.render("notFound", {categories});
    }
};

module.exports = controller;