const User = require('../models/Users');

module.exports = {
    showRegister: function (req, res) {
        res.render('register');
    },
    showLogin: function (req, res) {
        res.render('login');
    }
}