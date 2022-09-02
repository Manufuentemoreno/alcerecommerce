const path = require("path");
const db = require('../database/models');
const Orders = require("../database/models/Orders");
const Orders_details = require('../database/models/Orders_details');
const Product = require("../database/models/Product");
const Products = require('../database/models/Product');
const sequelize = db.sequelize;
const Op = sequelize.Op;

module.exports = {

    add: async (req, res) => {
        let ordenEnCarrito = await db.Orders.findOne({
            where: {
                user_id: req.session.loggedUser.id,
                order_status: 'enCarrito'
            }
        })

        if(!ordenEnCarrito) {
            
            let ordenCreada = await db.Orders.create(
              {
                order_date: new Date(),
                user_id: req.session.loggedUser.id,
                discount: 0,
                order_status: "enCarrito",
              }
            );

            let detalleCreado = await db.Orders_details.create(
                {
                    order_id: ordenCreada.id,
                    product_id: req.params.id,
                    amount: 1
                }
            )

            res.redirect('/products');

        } else {
            let detalleCreado = await db.Orders_details.create({
              order_id: ordenEnCarrito.id,
              product_id: req.params.id,
              amount: 1,
            });

            res.redirect('/products');
        }
        
    },

    list: async (req, res) => {
        let ordenEnCarrito = await db.Orders.findOne({
          where: {
            user_id: req.session.loggedUser.id,
            order_status: "enCarrito"
          },
        });

        if (ordenEnCarrito) {
            let detalles = await db.Orders_details.findAll({
              include: ["product"],
              where: {
                order_id: ordenEnCarrito.id,
              },
            });
            let totalOrden = await db.Orders_details.sum('product.price',{
              include: ["product"],
              where: {
                order_id: ordenEnCarrito.id,
              },
            });
            res.render('productCart', {detalles});
        } else {
            res.redirect('/');
        }
    },

    delete: async (req, res) => {
        await db.Orders_details.destroy({
            where: {
                id: req.params.id
            }
        })

        res.redirect('/cart');
    }
};