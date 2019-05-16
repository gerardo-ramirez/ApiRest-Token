const config = require('../config');
const mongoose = require('mongoose');
mongoose.connect(config.database,{ useNewUrlParser: true});


module.export = mongoose;
