const { validationResult } = require('express-validator');
const db = require('../database/models');
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
        
        if (!resultValidation.isEmpty()) { //Si el resultado de la validación no está vacío
            return res.render('register', {
                errors: resultValidation.mapped(), //Guarda los errores de validación que tiene express-validator
                oldData: req.body // Información que viajo en el req.body
            });
        }

        db.Users.findOne({
            where: {
                email: req.body.email
            }
        }).then(function (userInDB) {
            if (userInDB) {
                return res.render('register', {
                    errors: {
                        email: {
                            msg: 'Este email ya está registrado.'
                        }
                    },
                    oldData: req.body
                });
            } else {
                db.Users.create({
                    ...req.body,
                    password: bcryptjs.hashSync(req.body.password, 10),
                    profil_photo: req.file.filename
                }).then(function(){
                    res.redirect('/login');
                })
            }
        })
    },
    login: function (req, res) {
        let userToLogin = User.findByField('email', req.body.email);
        
        if (userToLogin) {
            let passwordIsOk = bcryptjs.compareSync(req.body.password, userToLogin.password);
            if (passwordIsOk) {
                req.session.loggedUser = userToLogin;
                
                res.redirect('/');

                return;
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

    },
    logout: function (req, res) {
        req.session.destroy();
        return res.redirect('/');
    }
}