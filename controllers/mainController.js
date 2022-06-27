const productos = require("../dataBaseProduct");
const carrito = require("../dataCarrito");

module.exports = {
    home : (req, res)=>{
        res.render("home",{"productos":productos});
    },

    product : (req,res) =>{
        res.render("productDetail");
    },

    cart : (req,res) =>{
        res.render("productCart",{"carrito":carrito});
    },

    register: (req, res) => {
        res.render("register");
    },

    login: (req, res) => {
        res.render("login");
    }
};