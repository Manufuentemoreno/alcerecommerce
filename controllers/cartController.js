const path = require("path");
const db = require('../database/models');
const sequelize = db.sequelize;

module.exports = {
    
    cart: (req, res)=>{
        req.session.loggedUser ? res.render("productCart") : res.render("login")
    }
    
};