const path = require("path");
const db = require('../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");
const { PassThrough } = require("stream");
const cartProducts = require("../modules/cartProductSide")

// Modelos
const Products = db.Products;
const categoryList = require('../modules/productCategoryTopBar');

let lastAdded = ""

module.exports = {
    home : async (req, res)=>{
        let productList = {};
        try {
            productList = await Products.findAll({limit:6})
        }catch(error){
            return res.render("notFound")
        }

        let categories = await categoryList();

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
        res.render("home",{
            "products": productList,
            categories,
            lastAdded,
            detalles
        });
        return lastAdded        
    },

    cart : async(req,res) =>{
        let categories = await categoryList();

        res.render("productCart",{
            "carrito":carrito,
            categories
        });
    },

    notFound : (req,res) =>{
        res.render('notFound');
    }
};