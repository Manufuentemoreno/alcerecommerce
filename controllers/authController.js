const { validationResult } = require('express-validator');
const User = require('../models/Users');

module.exports = {
    showRegister: function (req, res) {
        res.render('register');
    },
    showLogin: function (req, res) {
        res.render('login');
    },
    register: function (req, res) {
        const resultValidation = validationResult(req);

        if (resultValidation.errors.lenght > 0) {
            return res.render('register', {
                errors: resultValidation.mapped(),
                oldData: req.body
            });
        }

        User.create(req.body);

        return res.send('Usuario guardado');
    }
}