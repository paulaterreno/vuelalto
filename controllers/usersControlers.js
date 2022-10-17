"use strict";

const securityPass = require("../helpers/securityPass")
const User = require("../schemas/userSchema")


/*AQUÍ SE LOGGEA EL USUARIO*/

function getLoginForm (req, res, next) {
    res.render("LoginForm")                                                //   /users/login
};

/*AQUÍ SE PROCESA LOGGIN + INTERRACIÓN CON BASE DE DATOS*/
async function postLoginForm (req, res, next) {                          //capturamos los datos del form p loggin
    const {email, pass} = req.body;
    const user = await User.find().where({email})                        //consultamos a base de datos si coincide con algun email en la db
    /*res.send(user).end();*/
    if(!user.length) {                                                //si el array de datos esta vacio, el usuario no se encuentra en la db
    return res.render("LoginForm", {message: "Los datos ingresados son incorrectos"})
    };
    
    if (await securityPass.decodePass (pass,user[0].password)) {       //compara si la contraseña encriptada y el email ingresado coinciden / evalua como true p cotinuar
    const usr = {                                                      //creamos objeto para pasarle al la session. 
    id: user[0]._id,
    name: user[0].name,
    lastName: user[0].lastName
    }

    
    req.session.user = usr
        res.render("Acces", {user:`${req.session.user.name} ${req.session.user.lastName}`, id:req.session.user.id})
        } else return res.render("LoginForm", {message: "Los datos ingresados son incorrectos"}) 
        console.log(req.session)                                                                 //si la contraseña o email no son correctos.
};



/*REGISTRO DE USUARIO NUEVO */
function getRegisterForm (req, res, next) {
    res.render("RegisterForm")
};

/*AQUI SE CREA NUEVO USUARIO */
async function postRegisterForm (req, res, next) {                         
    const {name, lastName, email, pass} = req.body
    /*console.log(req.body)*/
    const password = await securityPass.encryptPass(pass)                 //error = new Error('data must be a string ..               
    /*res.json({original:pass, encrypted:password}) */                   //inhab. Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client
    
    const createUser = new User ({                                       //creamos objeto para mandar usuario a db
    name,lastName, email, password })
    
    createUser.save ((err) => {     
        if(!err) {
            req.session.user = `${name} ${lastName}`                 //creamos la sesión, con nombre y apellido de usuario.
            res.render("Acces", {user: req.session.user})            //llamamos al usuario
    } else {
        res.render("RegisterForm", {message:"La dirección de email ya se encuentra en uso"})
        }
    })

};

/*AQUI SE CREA SETTINGS PARA CONFG. DE CUENTA*/
async function getSettings (req,res) {
    const user = await User.findById(req.session.user.id).lean()  //ERR               // metodo para buscar por id usuario que esta logeado,
    res.send(user)  
}

/*AQUI SE PROCESA FORM SETTINGS*/                                        //controlador para modificar registro
async function postSettings (req, res) {
    res.send("envío registro mod")
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

module.exports = {getLoginForm, postLoginForm, getRegisterForm, postRegisterForm, getSettings, postSettings, validateEmail, logout}