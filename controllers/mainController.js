const Productos = require("../models/Products");
const carrito = require("../dataCarrito");
const allProduct = Productos.getData();

module.exports = {
    home : (req, res)=>{
        res.render("home",{"productos": allProduct});
    },

    cart : (req,res) =>{
        res.render("productCart",{"carrito":carrito});
    }
};