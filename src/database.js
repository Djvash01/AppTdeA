const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI,
    {useNewUrlParser:true,
        useCreateIndex: true,
        useFindAndModify: false
    })
    .then(db=>console.log('DB is connet !!'))
    .catch(err=>console.log(err));

module.exports = mongoose;
