const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const User = require('../models/User')

passport.use(new localStrategy({ //Validar mail
    usernameField: 'email',
    passwordField: 'password'
}, async(email, password, done) => {

    //Match Email
    const user = await User.findOne({ email });
    if (!user) { //Usuario no encontrado
        return done(null, false, { message: 'Not user found' });
    } else { //Sí encontró un usuario, valida
        const match = await user.matchPassword(password);
        if (match) {
            return done(null, user); //Pass Correcto, devuelve user
        } else {
            return done(null, false, { message: 'Incorrect Password' }); //PAss incorrecto, devuelve un false
        }
    }
}));


passport.serializeUser((user, done) => { //Guardar usuario
    done(null, user.id);
});

passport.deserializeUser((id, done) => { //Comprobar que el id tenga permisos en cada página que navega
    User.findById(id, (err, user) => {
        done(err, user);
    })

})