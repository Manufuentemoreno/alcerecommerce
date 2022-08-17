module.exports = (sequelize, dataTypes) => {
    let alias = 'Products';
    let cols = {
    };
    let config = {
        tableName: 'products',
        timestamps: false
    };
    const User = sequelize.define(alias, cols, config);

    return User;
}   