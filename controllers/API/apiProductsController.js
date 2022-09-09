const { Sequelize } = require('../../database/models');
const db = require('../../database/models');
const sequelize = db.sequelize;
const Op = sequelize.Op;

module.exports = {
  index: async (req, res) => {
    let count = await db.Products.count();

    let productsByCategory = await db.Products_categories.findAll({
      include: [{ association: "products", attributes: [] }],
      attributes: [
        "name",
        [sequelize.fn('count', sequelize.col('products.id')), 'count'],
      ],
      group: "products_categories.name",
    });

    let products = await db.Products.findAll({
        include: [{association: 'products_categories', attributes: ['name']}]
    });

    let productsProcessed = products.map(function(product) {
        let result = {
          id: product.id,
          name: product.name,
          description: product.description,
          category: product.products_categories.name,
          detail: 'http://localhost:3000/api/products/' + product.id
        };
        return result;
    })

    let productsCollection = {
      count: count,
      countByCategory: productsByCategory,
      products: productsProcessed
    };

    res.json(productsCollection);
  },

  detail: async (req, res) => {
    let product = await db.Products.findOne({
        include: 'products_categories',
        where: {
            id: req.params.id
        }
    });

    let productEntity = {
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock,
      category: product.products_categories.name,
      product_photo: 'http://localhost:3000/images/productDetail/' + product.product_photo
    };

    res.json(productEntity);
  }
};