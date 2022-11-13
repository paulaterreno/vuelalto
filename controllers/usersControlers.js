"use strict";

const securityPass = require("../helpers/securityPass")
const User = require("../schemas/userSchema")
const session = require('express-session')

/*AQUÍ SE LOGGEA EL USUARIO*/
function getLoginForm(req, res, next) {
    res.render("LoginForm")                                           // /users/login
    };


/*AQUÍ SE PROCESA LOGGIN + INTERRACCIÓN CON BASE DE DATOS*/
    async function postLoginForm(req, res, next) {                 //capturamos los datos del form p loggin
    const { email, pass } = req.body;
    const user = await User.find().where({ email })                //consultamos a base de datos si coincide con algun email en la db
    /*res.send(user).end();*/
    if (!user.length) {                                            //si el array de datos esta vacio, el usuario no se encuentra en la db
    return res.render("LoginForm", { message: "Usuario o contraseña incorrectos" })
    };

    if (await securityPass.decodePass(pass, user[0].password)) {    //compara si la contraseña encriptada y el email ingresado coinciden / evalua como true p cotinuar
        
        const usr = {                                                   //creamos objeto para pasarle al la session. 
        id: user[0]._id,
        name: user[0].name,
        lastName: user[0].lastName
        }
        
        req.session.user = usr
        res.render("Acces", { user: `${req.session.user.name} ${req.session.user.lastName}`, id: req.session.user.id })
        
    } else return res.render("LoginForm", { message: "Usuario o contraseña incorrectos" })   //si la contraseña o email no son correctos.
        /*console.log(req.session)*/
    };


/*REGISTRO DE USUARIO NUEVO */
function getRegisterForm(req, res, next) {
    res.render("RegisterForm")
    };


/*AQUI SE CREA NUEVO USUARIO */
async function postRegisterForm(req, res, next) {
    const { name, lastName, email, pass } = req.body
    const password = await securityPass.encryptPass(pass)
    /*res.json({original:pass, encrypted:password}) */                   //inhab. Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client
    
    const newUser = new User({                                           ////creamos objeto para mandar usuario a db
    name, lastName, email, password
    })

    /*console.log(newUser)  OBJETO CON DATOS USUARIO OK*/

    const usr = {
        id: newUser._id,
        name: newUser.name,
        lastName: newUser.lastName
    }

    newUser.save ((err) => {     
        if(!err) {
            req.session.user = usr //`${name} ${lastName}`                                 //creamos la sesión, con nombre y apellido de usuario.
            res.render("Acces", {user: `${req.session.user.name} ${req.session.user.lastName}`, id: req.session.user.id})                            //llamamos al usuario
    } else {
        res.render("RegisterForm", {message:"La dirección de email ya se encuentra en uso"})
        }
    })
    
};

/*AQUI SE CREA SETTINGS PARA CONFG. DE CUENTA*/
async function getSettings(req, res) {
    const user = await User.findById(req.session.user.id).lean()      //err! no tomo usuario en LOGIN, deriva a NOAUTH.
    res.render("EditUserForm", {user})
    
}

/*AQUI SE PROCESA FORM SETTINGS - submit */                                        //controlador para modificar registro
async function postSettings (req, res) {
    try {
    await User.findByIdAndUpdate(req.session.user.id, req.body)           //búsq por ID en db para crear modf. campos de edición form
    res.redirect("/Acces")
    } catch (err) {
    res.render("EditUserForm", {message:"Error, Intente nuevamente"})    //en caso de err!
    } 
}

async function deleteUser(req, res) {
    try {
    await User.findByIdAndDelete(req.session.user.id)               //mét mongo
    req.session.destroy()                                          //destruimos datos de sesión
    res.redirect("/")
    } catch (err) {
    res.render("EditUserForm", { message: "Ocurrió un error, intenta nuevamente" })
    }
}

/*AQUI SE CREA VALIDADOR DE EMAIL*/
async function validateEmail (req,res) {
    res.send("verificated in database")
}

/*AQUI SE CREA LOGOUT */
function logout(req, res) {
    req.session.destroy()
    res.redirect("/Inicio");
}

module.exports = {getLoginForm, postLoginForm, getRegisterForm, postRegisterForm, getSettings, postSettings, validateEmail, deleteUser, logout}