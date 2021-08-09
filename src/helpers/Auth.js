const helpers = {};

//Middleware

helpers.isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {

        return next(); //Si está autenticado, continua ejecutando el código.

    }

    req.flash('error_msg', 'Not Authorized') //Mensjae de no autoriuzado
    res.redirect('/users/signin'); // Si no está autenticado, llevar al user a la página de signin
}

module.exports = helpers;