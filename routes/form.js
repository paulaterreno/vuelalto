"use strict";

const express = require ('express');
const router = express.Router();                             //importamos enrutador
const nodemailer = require ('nodemailer');


router.get("/Contacto", (req,res) => {
    res.render("Contacto");
    })

router.post("/Contacto", (req,res) => {
    const {name, lastName, email, encuesta, message} = req.body //req body: contenido del cuerpo de la petición
    /*console.log(name);
    console.log(lastName);
    console.log(email);
    console.log(encuesta);
    console.log(message); */
    const eMessage = {                                           //creamos obj email
    to: "vueltaalto@it.edu",
    from: email,                                                 //capturamos campo de -> req.body.email
    subject: "Mensaje ingresado desde formulario web."
    }

const transport = nodemailer.createTransport({ 
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "b794dca9dffa9f",
        pass: "cf4ba93444eac7"
    }
    }); 

transport.sendMail(eMessage)
/*res.render() CREAR RESPUESTA D FORM ENVIADO*/ 
})


module.exports = router
