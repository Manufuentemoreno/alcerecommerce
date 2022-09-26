const path = require("path");
const db = require("../database/models");
const Orders = require("../database/models/Orders");
const Orders_details = require("../database/models/Orders_details");
const Product = require("../database/models/Product");
const Products = require("../database/models/Product");
const sequelize = db.sequelize;
const Op = sequelize.Op;

// Modelo de Categoías:
const categoryList = require('../modules/productCategoryTopBar');

// Integración de Mercado Pago

// SDK de Mercado Pago
const mercadopago = require("mercadopago");
// Agrega credenciales
mercadopago.configure({
  access_token:
    "APP_USR-3426985257424579-091210-4316cfe38167a79dc7a61e1e44d9a008-1196546840",
});

// Fin integración Mercado Pago

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

    
      let lastAdded = await db.Products.findOne({
        where: {
          id: req.params.id,
        },
      });
      req.session.addedProductId = lastAdded;
      req.session.addedProductId.maxAge = 4000


      res.redirect("back");
    } else {
      let detalleExistente = await db.Orders_details.findOne({
        where: {
          order_id: ordenEnCarrito.id,
          product_id: req.params.id,
        },
      });

      if (detalleExistente) {
        let detalleAgregado = await db.Orders_details.update(
          {
            amount: detalleExistente.amount + 1,
          },
          {
            where: {
              order_id: ordenEnCarrito.id,
              product_id: req.params.id,
            },
          }
        );

        let lastAdded = await db.Products.findOne({
          where: {
            id: req.params.id,
          },
        });
        req.session.addedProductId = lastAdded;
        req.session.addedProductId.maxAge = 4000
        res.redirect("back");
      } else {
        let detalleCreado = await db.Orders_details.create({
          order_id: ordenEnCarrito.id,
          product_id: req.params.id,
          amount: 1,
        });

        let lastAdded = await db.Products.findOne({
          where: {
            id: req.params.id,
          },
        });
        req.session.addedProductId = lastAdded;
        req.session.addedProductId.maxAge = 4000
        res.redirect("back");
      }
    }
  },

  list: async (req, res) => {
    let categories = await categoryList();

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
      res.render("productCart", { detalles, categories });
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

    res.redirect("back");
  },

  added: async (req, res) => {
    let products = await db.Products.findAll({
      include: [{ association: "products_categories" }],
    });

    let lastAdded = await db.Products.findOne({
      where: {
        id: req.session.addedProductId,
      },
    });

    res.render("productAdded", { products, lastAdded });
  },

  addOne: async (req, res) => {
    let detalleExistente = await db.Orders_details.findOne({
      where: {
        id: req.params.id,
      },
    });
    
    let detalleAgregado = await db.Orders_details.update(
        {
          amount: detalleExistente.amount + 1,
        },
        {
          where: {
            id: req.params.id,
          },
        });
    return res.redirect("back");
        
  },

  removeOne: async (req, res) => {
    let detalleExistente = await db.Orders_details.findOne({
      where: {
        id: req.params.id,
      },
    });

    let detalleAgregado = await db.Orders_details.update(
      {
        amount: detalleExistente.amount - 1,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    res.redirect("back");
  },

  startProces: (req, res) => {
    res.render("productCartConfirm");
  },

  checkout: async (req, res) => {
    await db.Orders.update(
      {
        order_status: "enProceso",
        delivery_method: req.body.delivery_method,
        payment_method: req.body.payment_method,
        delivery_adress: req.body.calle
          ? req.body.calle + " " + req.body.numero + ", " + req.body.localidad
          : null,
      },
      {
        where: {
          user_id: req.session.loggedUser.id,
          order_status: "enCarrito",
        },
      }
    );

    let result = 1;

    res.render("checkoutCart", { result });
  },

  checkoutMP: async (req, res) => {
    let ordenEnCarrito = await db.Orders.findOne({
      where: {
        user_id: req.session.loggedUser.id,
        order_status: "enCarrito",
      },
    });

    let detalles = await db.Orders_details.findAll({
      include: ["orders", "product"],
      where: {
        order_id: ordenEnCarrito.id,
      },
    });

    let itemsToSend = detalles.map(function (element) {
      let result = {
        title: element.product.name,
        unit_price: parseFloat(element.product.price),
        quantity: element.amount,
      };
      return result;
    });

    await db.Orders.update(
      {
        delivery_method: req.body.delivery_method,
        payment_method: req.body.payment_method,
        delivery_adress: req.body.calle
          ? req.body.calle + " " + req.body.numero + ", " + req.body.localidad
          : null,
      },
      {
        where: {
          user_id: req.session.loggedUser.id,
          order_status: "enCarrito",
        },
      }
    );

    // Crea un objeto de preferencia
    let preference = {
      items: itemsToSend,
      back_urls: {
        success: "http://localhost:3030/cart/success",
        failure: "http://localhost:3030/cart/failure",
        pending: "http://localhost:3030/cart/failure",
      },
      auto_return: "approved",
    };

    mercadopago.preferences
      .create(preference)
      .then(function (response) {
        console.log(response);
        res.redirect(response.body.init_point);
      })
      .catch(function (error) {
        console.log(error);
      });
  },

  success: async (req, res) => {
    let result = 1;

    await db.Orders.update(
      {
        order_status: "enProceso"
      },
      {
        where: {
          user_id: req.session.loggedUser.id,
          order_status: "enCarrito",
        },
      }
    );

    res.render("checkoutCart", { result });
  },

  failure: (req, res) => {
    let result = 0;
    res.render('checkoutCart', {result});
  }
};