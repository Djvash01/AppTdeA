if(process.env.NODE_ENV !== 'production'){ // Para saber si se esta en production o development
    require('dotenv').config(); //variables de entorno (.env) solo funcionan en ambientes development
}

const express = require('express');
const morgan = require('morgan');
const path = require('path');
const cors = require('cors');
const expressHandlebars = require('express-handlebars');
const methodOverride = require('method-override');
const session = require('express-session');
const flash = require('connect-flash');

//Initializations
const app = express();
require('./database'); // Iniciar la base de datos

//Settings
app.set('port', process.env.PORT || 3000);
app.set('views',path.join(__dirname, 'views'));
app.engine('.hbs', expressHandlebars({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs'
}) );
app.set('view engine', '.hbs');

//Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(session({
    secret: 'appTdeA',
    resave: true,
    saveUninitialized: true
}));
app.use(flash());
app.use(cors());


//Global Variables
app.use((req, res, next)=>{
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    next();
});

//Routes
app.use(require('./routes/index.routes'));
app.use('/api/courses',require('./routes/courses.routes'));
app.use('/api/users', require('./routes/user.routes'));


//Static files
app.use(express.static(path.join(__dirname,'public')));


//Starting the server
app.listen(app.get('port'), ()=>{
    console.log(`Server on port ${app.get('port')}`);
});