module.exports = (sequelize, dataTypes) => {
  let alias = "Orders";
  let cols = {
    id: {
      type: dataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    order_date: {
      type: dataTypes.DATE,
      allowNull: false,
    },
    discount: {
      type: dataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    order_status: {
      type: dataTypes.STRING,
      allowNull: false,
    },
    delivery_method: {
      type: dataTypes.STRING
    },
    delivery_adress: {
      type: dataTypes.STRING
    },
    between_streets: {
      type: dataTypes.STRING
    },
    payment_method: {
      type: dataTypes.STRING
    }
  };
  let config = {
    tableName: "orders",
    timestamps: true,
    paranoid: true,
  };
  
  const Order = sequelize.define(alias, cols, config);

  Order.associate = function(models) {
    Order.hasMany(models.Orders_details, {
        foreignKey: 'order_id',
        as: 'orders_details'
    })

    Order.belongsTo(models.Users, {
        foreignKey: 'user_id',
        as: 'users'
    })
  }

  return Order;
};