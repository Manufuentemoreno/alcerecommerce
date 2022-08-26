const path = require("path");
const db = require('../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");

// Modelos
const Products = db.Products;

module.exports = {
    home : (req, res)=>{
        Products.findAll()
        .then((productList)=>{
            res.render("home",{"productos": productList});})
        .catch(e=>res.send(e));
    },

    cart : (req,res) =>{
        res.render("productCart",{"carrito":carrito});
    }
};