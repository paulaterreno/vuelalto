"use strict";
require('dotenv').config()

const mongoose = require('mongoose');
const uriDB = process.env.uri_DB                                                              // uriDB conec. a .env                                     //enlazado en .env

mongoose.connect(uriDB, (err) => {
    err? console.log("Error de conexión con base de datos") :
    console.log("Mongo Atlas inicializado correctamente");

});


