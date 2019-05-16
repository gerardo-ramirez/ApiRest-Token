const express = require('express');
const route = express.Router();
const User = require('./models/user');
const jwt = require('jsonwebtoken');
//const superSecret = require('./server');

/*
creamos una api de autenticacion (jwt)
*/

route.post('/authentication', async (req,res) => {
 const user = await User.findOne({name: req.body.name});
  if(!user){
  await res.json({success: true, message:'authentication failed. User not found'});
  } else if(user) {
    const token = jwt.sign({user}, req.app.get('superSecret'));
//aqui ya obtenemos el token
      await  res.json({
          success: true,
          message: 'Disfrute su  token',
          token: token
});

  };


});





/* Hata aquí la  autenticacion token*/

route.get('/users', async (req, res) =>{
const user =  await User.find();
   res.json(user)
});

route.get('/setup', async (req,res)=>{
  const testUser = new User({
    name:'carlos',
    password:'password',
    admin: 'true'
  });
await  testUser.save();
res.json({
  success: true
})
});

route.post('/add', async (req,res)=>{
const nuevo = new User (req.body);
await nuevo.save();
res.redirect('/api/users');
});

module.exports= route;
