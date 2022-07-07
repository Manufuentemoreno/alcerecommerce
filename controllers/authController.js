const { validationResult } = require('express-validator');
const User = require('../models/Users');
const bcryptjs = require('bcryptjs');

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

        let userToCreate = {
            ...req.body,
            password: bcryptjs.hashSync(req.body.password, 10),
            profilePhoto: req.file.filename
        }
        
        User.create(userToCreate);

        return res.send('Usuario guardado');
    }
}