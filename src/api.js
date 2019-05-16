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
//si el token es true : pasamos a las apis

//las apis se resguardan con los middleware:
route.use((req,res,next)=>{
  //traemos el token de tres formas : json, headers, y por get.
  const token = req.body.token || req.query.token || req.headers['x-access-token'];
  //de esta forma  valido el token recibido
  if(token){ //si hay token
    jwt.verify(token, req.app.get('superSecret'),(err,decoded)=>{
      if(err){
        return res.json({success: false, message:"token incorrecto"});
      }else{
        req.decoded = decoded;
        next();
;      }
    });
  } else { //si no hay token
    return  res.status(403).send({
      success: false,
     message:"no existe token"    });
  }

});

//si el token es habilitado entonces puede pasar a la siguientes rutas 

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
