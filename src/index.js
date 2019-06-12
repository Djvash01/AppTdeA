if(process.env.NODE_ENV !== 'production'){ // Para saber si se esta en production o development
    require('dotenv').config(); //variables de entorno (.env) solo funcionan en ambientes development
}

const express = require('express');
const morgan = require('morgan');
const path = require('path');
const cors = require('cors');

//Initializations
const app = express();
require('./database'); // Iniciar la base de datos

//Settings
app.set('port', process.env.PORT || 3000);

//Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(cors());

//Routes
app.use('/api/courses',require('./routes/courses.routes'));


//Static files
app.use(express.static(path.join(__dirname,'public')));


//Starting the server
app.listen(app.get('port'), ()=>{
    console.log(`Server on port ${app.get('port')}`);
});