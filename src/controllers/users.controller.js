const usersCtrl = {};
const passport = require('passport');
const User = require('../models/User');

usersCtrl.renderSignUpForm = (req, res) => {
    res.render('users/signup') //Formulario
}

usersCtrl.signup = async(req, res) => {
    const { name, email, password, confirm_password } = req.body;
    const errors = [];

    if (password !== confirm_password) { //Validation
        errors.push({ text: 'password do not match' })
    }
    if (password.length < 4) { //Validation
        errors.push({ text: 'password  must be at least 4 chracters' })
    }
    if (errors.length > 0) {
        res.render('users/signup', { //Show errors
            errors,
            name,
            email
        })
    } else { //Register
        const emailUSer = await User.findOne({ email: email })
        if (emailUSer) {
            req.flash('error_msg', 'The email is alredy in use')
            res.redirect('/users/signup')
        } else {
            const newUSer = new User({ name, email, password })
            newUSer.password = await newUSer.encrypPassword(password)
            await newUSer.save()
            req.flash('success_msg', 'Register successfuly')
            res.redirect('/users/signin')
        }
    }
}

usersCtrl.renderSigninForm = (req, res) => {
    res.render('users/signin') //Formulario
}

usersCtrl.signin = passport.authenticate('local', {
    failureRedirect: '/users/signin', //Pass incorrect
    successRedirect: '/notes', //Pass correcto
    failureFlash: true //Mensaje de error en caso de que el pass sea incorrecto
});

usersCtrl.logout = (req, res) => {
    req.logout();
    req.flash('success_msg', 'You are logged out now');
    res.redirect('/users/signin')
}
module.exports = usersCtrl;