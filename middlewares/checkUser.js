module.exports = function (req, res, next) {
    if (!req.session.loggedUser) {
        return res.redirect('/login');
    }
    next();
}