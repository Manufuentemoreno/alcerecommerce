const db = require('../database/models');

module.exports = {
    list: function (req, res) {
        db.Users.findAll()
        .then(function(users){
            res.render('usersList', {users});
        })
    }
}