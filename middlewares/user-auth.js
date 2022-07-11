/*Tanto haya o no un usuario loggeado,
me setea la variable 'locals.loggedUser' para la vistas.*/

module.exports = (req, res, next) => {
    res.locals.loggedUser = req.session.loggedUser;

    next();
}