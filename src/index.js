const express = require('express');
const config = require('./config');
const engine = require('ejs-mate');
const path = require('path');
const morgan = require('morgan');
const passport = require('passport');
const session = require('express-session');
const flash = require('connect-flash');
//Initialization
const app = express();
require('./database');
require('./passport/local-auth');




//setting
app.engine('ejs', engine); //Decimos que motor de plantillas vamos a utilizar. El primer parámetro es el nombre que expone ejs.
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.set('port', process.env.PORT || 3000);
// console.log('app', app);
// console.log('process.env', process.env.PORT);

//middlewares -> funciones que se ejecutan antes de que pasen a las rutas
app.use(morgan('dev'))
app.use(express.urlencoded({
    extended: false //Solo datos, no archivos o imagenes pesados
})); //Podemos recibir los datos desde un formulario
app.use(session({
    secret: 'mysecretsession',
    resave: false,
    saveUninitialized: false
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
    app.locals.signupMessage = req.flash('signupMessage');
    app.locals.signinMessage = req.flash('signinMessage');
    app.locals.user = req.user;
    next();
});


//Routes
const routes = require('./routes/index');
app.use('/', routes);


//starting the server
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
});

// app.listen(config.PORT, () => {
//     console.log('Server on port', config.PORT);
// });