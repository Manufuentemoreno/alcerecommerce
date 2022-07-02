// MODELO CRUD DEL JSON

const fs = require('fs');

const User = {
    
    fileName: './data/users-db.json',

    getData: function () {
        return fs.readFileSync(this.fileName, 'utf-8');
    },

    create: function (userData) {

    }
}

console.log(User.getData());

//00:09 min.