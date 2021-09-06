var mongoose = require('mongoose');
var config = require('./config');
 
// connect to mongoDB 
mongoose.connect(config.dbUrl, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.connection.on('connected', () => {
    console.log('connected to mongo database');
});

mongoose.connection.on('error', err => {
    console.log('Error at mongoDB: ' + err);
});