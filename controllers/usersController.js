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

    update: async function (req, res) {
        let userId = req.params.id;
        let userEdited = await db.Users.findByPk(userId);
        let newData = req.body;

        await db.Users.update({
            email: userEdited.email != newData.email ? newData.email : userEdited.email,
            category: userEdited.category != newData.category ? newData.category : userEdited.category,
            name: userEdited.name != newData.name ? newData.name : userEdited.name,
            last_name: userEdited.last_name != newData.last_name ? newData.last_name : userEdited.last_name,
            birth_date: userEdited.birth_date != newData.birth_date ? newData.birth_date : userEdited.birth_date,
            profil_photo: req.file ? req.file.filename : userEdited.profil_photo
        },
        {
            where: {id: userId}
        }).catch(error=>res.send(error))

        return res.redirect('/users');        
    }
}