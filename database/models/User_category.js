module.exports = (sequelize, dataTypes) => {
    let alias = 'User_category';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            autoIncrement: true,
            primeryKey: true,
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
    const model = sequelize.define(alias, cols, config);
    return model;
}