//Librerias
const express = require('express');
const routes = express.Router();
const usersControllers = require('../controllers/users_controllers')

//Rutas
//Endpoint para crear usuarios
routes.post('/crearUsuario', usersControllers.createUsers)
//Endpoint para consultar saldo
routes.post('/consultarSaldo', usersControllers.consulAmount)
//Endpoint para retirar saldo de cuenta de debito
routes.post('/retirarDinero', usersControllers.removeAmount)
//Endpoint para aumentar mis ahorros
routes.post('/agregarSaldo', usersControllers.addAmount)
//Endpoint para retirar saldo de cuenta de credito
routes.post('/retirarDineroCredito', usersControllers.removeAmountCredit)


//export
module.exports = routes;
