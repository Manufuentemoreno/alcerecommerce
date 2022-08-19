module.exports = (sequelize, dataTypes) => {
    let alias = 'Products';
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
            allowNull: false
        },
        price:{
            type: dataTypes.DECIMAL(10,2),
            allowNull: false
        },
        product_photo:{
            type: dataTypes.STRING,
            allowNull: false
        },
        special_offer:{
            type: dataTypes.INTEGER,
            allowNull: false
        },
        deleted_at:{
            type: dataTypes.DATE
        },
        category_id:{
            type:dataTypes.BIGINT(10),
            allowNull: false
        }
    };
    let config = {
        tableName: "products",
        timestamps: false
    };
    const Products = sequelize.define(alias, cols, config);

    Products.associate = function(models) {
        Products.belongsTo(models.Products_categories, {
            as: "products_categories", 
            foreignKey: "category_id"
        })
    }   
    
    return Products;
}   