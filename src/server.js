const express = require("express");
const path = require("path");
const exphbs = require("express-handlebars");
const morgan = require('morgan')
const methodOverride = require("method-override")
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');

//Initializations
const app = express();
require('./config/passport');

//Setting
app.set("port", process.env.PORT || 4000);
app.set("views", path.join(__dirname, "views"));
app.engine(
    ".hbs",
    exphbs({
        defaultLayout: "main",
        layoutsDir: path.join(app.get("views"), "layouts"),
        partialsDir: path.join(app.get("views"), "partials"),
        extname: ".hbs",
    })
);

app.set("view engine", ".hbs");

//Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(methodOverride("_method"));


//Global Variables
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg'); //Message Success
    res.locals.error_msg = req.flash('error_msg'); //Massage Error
    res.locals.error = req.flash('error'); //Massage Error
    res.locals.user = req.user || null; //Variable del usuario
    next();
})

//Routes
app.use(require('./routes/index.routes'));
app.use(require('./routes/notes.routes'));
app.use(require('./routes/user.routes'));


//Static Files
app.use(express.static(path.join(__dirname, "public")));

module.exports = app;