module.exports = (sequelize, dataTypes) => {
    let alias = 'Users';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        email: {
            type: dataTypes.STRING,
            allowNull: false
        },
        password: {
            type: dataTypes.STRING,
            allowNull: false
        },
        category: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        name: {
            type: dataTypes.STRING,
            allowNull: false
        },
        last_name: {
            type: dataTypes.STRING,
            allowNull: false
        },
        birth_date: {
            type: dataTypes.DATE,
            allowNull: false
        },
        profil_photo: {
            type: dataTypes.STRING(500)
        }
    };
    let config = {
        tableName: 'users',
        timestamps: true,
        paranoid: true
    };
    const User = sequelize.define(alias, cols, config);

    User.associate = function (models) {
        User.hasMany(models.Orders, {
            as: 'orders',
            foreignKey: 'user_id'
        })
    };

    return User;
}