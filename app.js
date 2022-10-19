"use strict";

const path = require('path');
const express = require ('express');                                     //o import express from "express";  +edit "type":"module" JSON
const hbs = require ("express-handlebars");
const { strict } = require("assert");
const app = express();
const PORT = 4242;
const router = require ('./routes/form.js')                              //imp form
require("./config/mongodb.js")
const session = require('express-session')
const auth = require('./helpers/auth')



app.engine(".hbs", hbs.engine({extname:"hbs"}))                                        //mod. para evitar metodo import
app.set('view engine', 'hbs');
app.set('views', (path.join(__dirname,'./views')));
app.use(express.static(path.join(__dirname, "/public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false })); 
app.use(session({
    secret: process.env.acces_SESSION,
    resave: false,
    saveUninitialized: true,
    /*cookie: { secure: true } => TRAJO PROBLEMAS EN RUTA LOGIN, DESAHBILITAR.*/
    }));



app.listen(PORT, (err) => {
    err? console.log( `Error: ${err.code} `)
    :
    console.log( `Server runnign on http://localhost:${PORT} `);
})


app.get("/",(req,res) => {
res.render("Inicio", {user: req.session.user});
})

/*app.get("/Inicio", (req, res) => {
res.render("Cursos"); //VER BOTON CTA
})*/

app.get("/Inicio",(req,res) => {
    res.render("Inicio");                    //agregamos login de sesión en inicio
    })  

app.get("/Cursos",(req,res) => {
res.render("Cursos");
})

app.get("/Becas",(req,res) => {
res.render("Becas");
})

app.use("/", router)                                                    //dejar ruta "/" de lo contrario err nav. cannotget/Contacto


app.get("/Acces", auth, (req,res) => {                                                     //ruta que requiere autorización (sesión iniciada), agregamos middleware para verificar estado.
    res.render("Acces", {user:`${req.session.user.name} ${req.session.user.lastName}`,    //desestructuramos propiedades del objeto usr p. no obtener error objectobject
    id:req.session.user.id})                                                            
})

app.use ("/users", require("./routes/usersRoutes"))

app.get("/AuthDenied", (req,res) => {
    res.render("AuthDenied")          //chek
}
)



/* //crear archivo err
app.get("*" , (req,res) => {
res.sendfile(__dirname +  '/public/images/404.jpg')
}) 
*/



