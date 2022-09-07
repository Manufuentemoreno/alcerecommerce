module.exports = function (req, res, next) {
    if (!req.session.loggedUser) {
        return res.render('notFound');
    }
    next();
}