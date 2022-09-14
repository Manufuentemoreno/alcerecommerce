const path = require("path");
const db = require('../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");
const { PassThrough } = require("stream");

// Modelos
const Products = db.Products;
const categoryList = require('../modules/productCategoryTopBar');

module.exports = {
    home : async (req, res)=>{
        let productList = {};
        try {
            productList = await Products.findAll({limit:6})
        }catch(error){
            return res.render("notFound")
        }

        let categories = await categoryList();

        res.render("home",{
            "products": productList,
            categories
        });
        
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