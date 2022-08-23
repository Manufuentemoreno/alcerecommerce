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
    },
    update: function (req, res) {
        let userId = req.params.id;
        db.Users.update({
            email: req.body.email,
            category: req.body.category,
            name: req.body.name,
            last_name: req.body.last_name,
            birth_date: req.body.birth_date
        },
        {
            where: {id: userId}
        })
        .then(function(){
            return res.redirect('/users')
        })
        .catch(error=>res.send(error))
    }
}