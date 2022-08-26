module.exports = function (req, res, next) {
    let loggedUser = req.session.loggedUser
    
    if (loggedUser.category == 'adminUser') {
        next();
    } else {
        res.redirect('/');
    }
}