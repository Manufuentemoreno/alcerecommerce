module.exports = (sequelize, dataTypes) => {
    let alias = 'Users_categories';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        name: {
            type: dataTypes.STRING,
            allowNull: false
        },
    };
    let config = {
        tableName: 'users_categories',
        timestamps: false
    };
    const user_category = sequelize.define(alias, cols, config);
    
    user_category.associate = (models) => {
        user_category.hasMany(models.Users, {
            foreignKey: 'category_id',
            as: 'users'
        })
    }

    return user_category;
}