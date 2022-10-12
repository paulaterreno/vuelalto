"use strict";

const bcrypt = require ("bcrypt") 
const securityPass = require("../helpers/securityPass")
const User = require("../schemas/userSchema")

function getLoginForm (req, res, next) {
    res.render("LoginForm")                                           //   /users/login
};

function postLoginForm (req, res, next) {
    console.log(req.body)                                             // (?) [Object: null prototype]
};


function getRegisterForm (req, res, next) {
    res.render("RegisterForm")
};

/*AQUI SE CREA NUEVO USUARIO */

async function postRegisterForm (req, res, next) {                       
    const {name, lastName, email, pass} = req.body
    console.log(req.body)
    const password = await securityPass.encryptPass(pass)   //error = new Error('data must be a string ..               
    res.json({original:pass, encrypted:hashedPass})
    
    const createUser = new User ({
    name,lastName, email, password })

    createUser.save ((err) => {
        if(!err) {
    } else {
        res.render("RegisterForm", {message:"La dirección de email ya se encuentra en uson"})
        }
    })

};


module.exports = {getLoginForm, postLoginForm, getRegisterForm, postRegisterForm}