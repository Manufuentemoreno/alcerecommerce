module.exports = (sequelize, dataTypes) => {
    let alias = 'Products_categories';
    let cols = {
        id:{
            type: dataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false 
        },
        name:{
            type: dataTypes.STRING,
            allowNull: false
        },
        description:{
            type: dataTypes.STRING,
            allowNull: true
        }
    };
    let config = {
        tableName: "products_categories",
        timestamps: false
    };
    const Products_categories = sequelize.define(alias, cols, config);

    Products_categories.associate = function(models) {
        Products_categories.hasMany(models.Products, { 
            as: "products",
            foreignKey: "category_id"
        })
    }

    return Products_categories;
}   