const mongoose = require('mongoose');
const URI = 'mongodb://localhost/apptdea';

mongoose.connect(URI,
    {useNewUrlParser:true,
        useCreateIndex: true
    })
    .then(db=>console.log('DB is connet !!'))
    .catch(err=>console.log(err));

module.exports = mongoose;
