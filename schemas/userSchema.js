"use strict";

const mongoose = require('mongoose');
const {Schema, model} = require('mongoose')                                                             //imp entre llaves por traer var. elementos

const userSchema = new Schema ({                                                                      // "schema" es un constructor, indica el modelo de usuario unicamente.
    name: {type: String , required: true},
    lastName: {type: String, required: true},
    email: {type: String,  required: true, lowercase: true, trim: true, unique: true  },          //agregamos requerimentos para usuario y para ver nuestra base de datos.
    password: {type: String, required: true},
    validEmail: {type: Boolean, default:false}                               //valida email para operaciones futuras ej: link a email para validar si el usuario brinda info correcta / seguridad informatica
},

{timestamps: true}                                                           //createdAt, updatedAt => registro de usuarios y modf. de cuenta

);

const User = model("User", userSchema)                                     //constructor, crea instancias del esquema asignado. (!) Para trabajar con el esquema, llamamos AL MODELO (user) 
module.exports = User 

