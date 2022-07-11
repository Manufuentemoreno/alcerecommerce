const { validationResult } = require('express-validator');
const User = require('../models/Users');
const bcryptjs = require('bcryptjs');
const Productos = require("../models/Products");
const allProduct = Productos.getData();

module.exports = {
    showRegister: function (req, res) {
        res.render('register');
    },
    showLogin: function (req, res) {
        res.render('login');
    },
    register: function (req, res) {
        const resultValidation = validationResult(req);

        if (!resultValidation.isEmpty()) { //Si el resultado de la validación no está vacío
            return res.render('register', {
                errors: resultValidation.mapped(), //Guarda los errores de validación que tiene express-validator
                oldData: req.body // Información que viajo en el req.body
            });
        }

        let userInDB = User.findByField('email', req.body.email);
        if (userInDB) {
            return res.render('register', {
                errors: {
                    email: {
                        msg: 'Este email ya está registrado.'
                    }
                },
                oldData: req.body
            });
        }
        
        let userToCreate = {
            ...req.body,
            password: bcryptjs.hashSync(req.body.password, 10),
            profilePhoto: req.file.filename
        }
        
        let userCreated = User.create(userToCreate);

        return res.redirect('/login');
    },
    login: function (req, res) {
        let userToLogin = User.findByField('email', req.body.email);
        
        if (userToLogin) {
            let passwordIsOk = bcryptjs.compareSync(req.body.password, userToLogin.password);
            if (passwordIsOk) {
                req.session.userLogged = userToLogin;
                return res.render('home', {
                    user: req.session.userLogged,
                    productos: allProduct
                });
            }
            return res.render('login', {
                errors: {
                    email: {
                        msg: 'Las credenciales son inválidas'
                    }
                }
            })
        }

        return res.render('login', {
            errors: {
                email: {
                    msg: 'Email no registrado'
                }
            }
        })

    }
}