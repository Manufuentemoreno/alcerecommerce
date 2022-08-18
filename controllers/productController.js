const path = require("path");
const db = require('../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");

// Modelo
const Products = db.Products;

// Validations-express validator
const { validationResult } = require("express-validator");

const controller = {
    index: (req, res) => {
        Products.findAll({
            include: ["category_id"]
        })
            .then(productsList =>{
                res.send(productsList)
            })
    }
};

module.exports = controller;