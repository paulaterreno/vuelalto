"use strict";

const bcrypt = require ("bcrypt") 
const saltRounds = 10;                                             //nro recomendado por fabricantes

const encryptPass = async (pass)  => {                             //func que nos permite encriptar pass con metodo hash
    return await bcrypt.hash(pass,saltRounds);
};

const decodePass = async (pass, hashedPass) => {                       //argumentos que compara la pass creada por usuario y la pass hasheada por bcrypt
    return await bcrypt.compare(pass, hashedPass)
};

module.exports = {encryptPass, decodePass}