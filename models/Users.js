// MODELO CRUD DEL JSON

const fs = require('fs');
const { all } = require('../routes/products-router');

const User = {
    
    fileName: '../data/users-db.json',

    getData: function () {
        return JSON.parse(fs.readFileSync(this.fileName, 'utf-8'));
    },

    generateId: function () {
        let allUsers = this.findAll();
        let lastuser = allUsers.pop();
        if (lastuser) {
            return lastuser.id + 1;
        }
        return 1;
    },

    findAll: function () {
        return this.getData();
    },

    findByPk: function (id) {
        let allUsers = this.findAll();
        let userFound = allUsers.find(elemento => elemento.id == id);
        return userFound;
    },

    findByField: function (field, text) {
        let allUsers = this.findAll();
        let userFound = allUsers.find(elemento => elemento[field] == text);
        return userFound;
    },

    create: function (userData) {
        let allUsers = this.findAll();
        let newUser = {
            id: this.generateId(),
            ...userData
        }
        allUsers.push(newUser);
        fs.writeFileSync(this.fileName, JSON.stringify(allUsers, null, 4));
        return true;
    },

    delete: function (id) {
        let allUsers = this.findAll();
        let finalUsers = allUsers.filter(elemento => elemento.id != id); // Devuelve todos los usuarios que son distintos al que se pasó por id. Todos menos ese.
        fs.writeFileSync(this.fileName, JSON.stringify(finalUsers, null, 4));
        return true;
    }
}

module.exports = Users;