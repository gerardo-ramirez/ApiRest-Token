const express = require('express');
const app = express();
const root = require('./api.js');
const morgan = require('morgan');
const config = require('./config');
//db connection
require('./connect/connect');
//
//settings
app.set('port', process.env.PORT || 8080 );
app.set('superSecret',config.secret)


//middleware
app.use(express.json());
app.use(express.urlencoded({extended: false }));

app.use(morgan('dev'));

//routes.
app.use('/api/',root);
//listen
app.listen(app.get('port'), ()=>{
  console.log('listen on port 8080')
});
