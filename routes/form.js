"use strict";

const express = require ('express');
const router = express.Router();                                          //importamos enrutador
const nodemailer = require ('nodemailer');
const {validationResult} = require('express-validator');
const validationForm = require ('../validations/validationForm')          //imp objetos que permiten la validación dentro del arreglo que sera exportado p/uso.

router.get("/Contacto", (req,res) => {
    res.render("Contacto");
    })

router.post("/Contacto", validationForm, async (req,res) => {
    const errors = validationResult (req); 

    if (!errors.isEmpty()) {
        const validData = req.body                                     //array para rend form si hay errores + hacerlo visible al usuario
        const warningErr = errors.array();
        /*console.log(errors.array()); */                  
        res.render("Contacto", {warningErr, validData})
        } else { 
    const {name, lastName, email, encuesta, message} = req.body      //req body: contenido del cuerpo de la petición
    /*console.log(name);
    console.log(lastName);
    console.log(email);
    console.log(encuesta);
    console.log(message); */
    const eMessage = {                                              //creamos obj email
    to: "vueltaalto@it.edu",
    from: email,                                                    //capturamos campo de -> req.body.email
    subject: "Mensaje ingresado desde formulario web.",
    }

const transport = nodemailer.createTransport ({ 
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "b794dca9dffa9f",
        pass: "cf4ba93444eac7"
    }
    })

const mailStatus = await transport.sendMail(eMessage);            //instruc. avoid mailStatus undefined
let mailFeedbak = "";
if (mailStatus.rejected.length) {
    mailFeedbak = "Su mensaje no pudo ser enviado";
    } else {
    mailFeedbak = "Mensaje enviado correctamente";    
    }

    res.render("Contacto", {message: mailFeedbak})             //! TO CHEK RES.RENDER() RESP FORM + VALID. FRONT
}

})

module.exports = router
