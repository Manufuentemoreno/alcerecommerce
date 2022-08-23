const db = require('../database/models');

module.exports = {
    list: function (req, res) {
        db.Users.findAll()
        .then(function(users){
            res.render('usersList', {users});
        })
    },
    edit: function (req, res) {
        let userId = req.params.id;
        db.Users.findByPk(userId)
        .then(function(userToEdit){
            res.render('usersEdit', {userToEdit});
        })
        .catch(error=>res.send(error));
    }
}