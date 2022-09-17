const db = require("../database/models");
const dayjs = require("dayjs");

module.exports = {
  ordersTakeAway: async (req, res) => {
    let ordenesConRetiroRaw = await db.Orders.findAll({
      include: ["orders_details"],
      where: {
        order_status: "enProceso",
        delivery_method: "retiro",
      },
    });

    let ordenesConRetiro = ordenesConRetiroRaw.map((item) => {
      let result = {
        id: item.id,
        order_date: dayjs(item.order_date).format("DD/MM/YYYY hh:mm:ss"),
        order_status: item.order_status,
        delivery_method: item.delivery_method,
        payment_method: item.payment_method,
      };
      return result;
    });

    let ordenesConRetiroListasRaw = await db.Orders.findAll({
      include: ["orders_details"],
      where: {
        order_status: "lista",
        delivery_method: "retiro",
      },
    });

    let ordenesConRetiroListas = ordenesConRetiroListasRaw.map((item) => {
      let result = {
        id: item.id,
        order_date: dayjs(item.order_date).format("DD/MM/YYYY"),
        order_status: item.order_status,
        delivery_method: item.delivery_method,
        payment_method: item.payment_method,
        updatedAt: dayjs(item.updatedAt).format("DD/MM/YYYY hh:mm:ss"),
      };
      return result;
    });

    let ordenesConRetiroRetiradasRaw = await db.Orders.findAll({
      include: ["orders_details"],
      where: {
        order_status: "retirada",
        delivery_method: "retiro",
      },
    });

    let ordenesConRetiroRetiradas = ordenesConRetiroRetiradasRaw.map((item) => {
      let result = {
        id: item.id,
        order_date: dayjs(item.order_date).format("DD/MM/YYYY"),
        order_status: item.order_status,
        delivery_method: item.delivery_method,
        payment_method: item.payment_method,
        updatedAt: dayjs(item.updatedAt).format("DD/MM/YYYY hh:mm:ss"),
      };
      return result;
    });

    res.render("orderstakeAway", {
      ordenesConRetiro,
      ordenesConRetiroListas,
      ordenesConRetiroRetiradas,
    });
  },

  updateListo: async (req, res) => {
    await db.Orders.update(
      {
        order_status: "lista",
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.redirect("back");
  },

  updateRetirado: async (req, res) => {
    await db.Orders.update(
      {
        order_status: "retirada",
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.redirect("back");
  },

  updateBackToProcess: async (req, res) => {
    await db.Orders.update(
      {
        order_status: "enProceso",
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.redirect("back");
  },

  updateBackToReady: async (req, res) => {
    await db.Orders.update(
      {
        order_status: "lista",
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.redirect("back");
  },

  orderDelete: async (req, res) => {
    await db.Orders.destroy(
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.redirect("back");
  },

  detail: async (req, res) => {
    let ordenEnPreparacion = await db.Orders.findOne({
      where: {
        id: req.params.id,
      },
    });

    let detalles = await db.Orders_details.findAll({
      include: ["product"],
      where: {
        order_id: ordenEnPreparacion.id,
      },
    });

    res.render("orderDetail", { ordenEnPreparacion, detalles });
  },
};