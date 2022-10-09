
const mongoose = require('mongoose');
const {Schema} = requiere('mongoose')                                         //imp entre llaves por traer var. elementos

const userSchema = new Schema({
    name:{tipe:String , required:true},
    lastName:{tipe:String , required:true},
    email:{tipe:String , required:true, lowercase:true, trim:true, unique:true},          //agregamos requerimentos para usuario y para ver nuestra base de datos.
    password: {tipe: String, required:true}
},
{timestamps: true}                                                           //createdAt, updatedAt => registro de usuarios y modf. de cuenta

);

const User = model("User", userSchema)                                     //constructor, crea instancias del esquema asignado. (!) Para trabajar con el esquema, llamamos AL MODELO (user) 


module.exports = User 