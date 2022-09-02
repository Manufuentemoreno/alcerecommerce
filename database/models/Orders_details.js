module.exports = (sequelize, dataTypes) => {
  let alias = "Orders_details";
  let cols = {
    id: {
      type: dataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    amount: {
      type: dataTypes.INTEGER,
      allowNull: false,
    },
  };
  let config = {
    tableName: "orders_details",
    timestamps: true,
    paranoid: true,
  };

  const Order_detail = sequelize.define(alias, cols, config);

  Order_detail.associate = function(models) {
    Order_detail.belongsTo(models.Orders, {
        foreignKey: 'order_id',
        as: 'orders'
    })

    Order_detail.belongsTo(models.Products, {
        as: 'product',
        foreignKey: 'product_id'
    })
  }

  return Order_detail;
};