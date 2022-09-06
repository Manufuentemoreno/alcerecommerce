const path = require("path");
const db = require("../database/models");
const Orders = require("../database/models/Orders");
const Orders_details = require("../database/models/Orders_details");
const Product = require("../database/models/Product");
const Products = require("../database/models/Product");
const sequelize = db.sequelize;
const Op = sequelize.Op;

module.exports = {
  add: async (req, res) => {
    let ordenEnCarrito = await db.Orders.findOne({
      where: {
        user_id: req.session.loggedUser.id,
        order_status: "enCarrito",
      },
    });

    if (!ordenEnCarrito) {
      let ordenCreada = await db.Orders.create({
        order_date: new Date(),
        user_id: req.session.loggedUser.id,
        discount: 0,
        order_status: "enCarrito",
      });

      let detalleCreado = await db.Orders_details.create({
        order_id: ordenCreada.id,
        product_id: req.params.id,
        amount: 1,
      });

      req.session.addedProductId = req.params.id;
      res.redirect("/cart/added");

    } else {

      let detalleExistente = await db.Orders_details.findOne({
        where: {
          order_id: ordenEnCarrito.id,
          product_id: req.params.id
        }
      })

      if (detalleExistente) {
        let detalleAgregado = await db.Orders_details.update({
          amount: detalleExistente.amount + 1
        },
        {
          where: {
            order_id: ordenEnCarrito.id,
            product_id: req.params.id
          }
        });

        req.session.addedProductId = req.params.id;
        res.redirect("/cart/added");
      } else {
        let detalleCreado = await db.Orders_details.create({
          order_id: ordenEnCarrito.id,
          product_id: req.params.id,
          amount: 1,
        });
  
        req.session.addedProductId = req.params.id;
        res.redirect("/cart/added");
      }
      
    }
  },

  list: async (req, res) => {
    let ordenEnCarrito = await db.Orders.findOne({
      where: {
        user_id: req.session.loggedUser.id,
        order_status: "enCarrito",
      },
    });

    if (ordenEnCarrito) {
      let detalles = await db.Orders_details.findAll({
        include: ["product"],
        where: {
          order_id: ordenEnCarrito.id,
        },
      });
      let totalOrden = await db.Orders_details.sum("product.price", {
        include: ["product"],
        where: {
          order_id: ordenEnCarrito.id,
        },
      });
      res.render("productCart", { detalles });
    } else {
      res.redirect("/");
    }
  },

  delete: async (req, res) => {
    await db.Orders_details.destroy({
      where: {
        id: req.params.id,
      },
    });

    res.redirect("/cart");
  },

  added: async (req, res) => {
    
    let products = await db.Products.findAll({
      include: [{ association: "products_categories" }],
    })

    let lastAdded = await db.Products.findOne({
      where: {
        id: req.session.addedProductId
      },
    });

    res.render("productAdded", { products, lastAdded });
  },

  addOne: async (req, res) => {
    let detalleExistente = await db.Orders_details.findOne({
      where: {
        id: req.params.id
      }
    });

    let detalleAgregado = await db.Orders_details.update(
      {
        amount: detalleExistente.amount + 1,
      },
      {
        where: {
          id: req.params.id
        },
      }
    );

    res.redirect('/cart');
  },

  removeOne: async (req, res) => {
    let detalleExistente = await db.Orders_details.findOne({
      where: {
        id: req.params.id
      }
    });

    let detalleAgregado = await db.Orders_details.update(
      {
        amount: detalleExistente.amount - 1
      },
      {
        where: {
          id: req.params.id
        },
      }
    );

    res.redirect('/cart');
  },

  startProces: (req, res)=>{
      res.render("productCartConfirm")
    },

  checkout: (req, res)=>{
    let options = [0, 1]
    let result = Math.floor(Math.random()*options.length)
    // para simular una compra exitosa o no exitosa y modificar la vista
    res.render("checkoutCart", {result})
  }
};