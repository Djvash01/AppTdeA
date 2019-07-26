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
const passport = require('passport');

//Initializations
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
require('./database'); // Iniciar la base de datos
require('./config/passport'); // para usar la autenticacion
const {isAuthenticated} = require('./helpers/auth');

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
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(cors());



//Global Variables
app.use((req, res, next)=>{
    res.locals.answer = req.flash('answer');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null ;
    next();
});

//Routes
app.use(require('./routes/index.routes'));
app.use(require('./routes/chat.routes'));
app.use('/api/events', require('./routes/event.routes'));
app.use('/api/courses', isAuthenticated, require('./routes/courses.routes'));
app.use('/api/users', require('./routes/user.routes'));


//Static files
app.use(express.static(path.join(__dirname,'public')));


//websockets
io.on('connection', (socket) => { 
    console.log('Usuario conectados', socket.id);

    socket.on('chat:message', (data)=>{
        io.sockets.emit('chat:message', data);
    });

    socket.on('chat:typing', (data)=>{
        socket.broadcast.emit('chat:typing',data);
    });
});

//Starting the server
server.listen(app.get('port'), ()=>{
    console.log(`Server on port ${app.get('port')}`);
});

//