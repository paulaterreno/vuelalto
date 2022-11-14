"use strict";

const express = require ('express');
const router = express.Router();                                          //importamos enrutador
const nodemailer = require ('nodemailer');
const {validationResult} = require('express-validator');
const validationForm = require ('../validations/validationForm')          //imp objetos que permiten la validación dentro del arreglo que sera exportado p/uso.

router.get("/Contacto", (req,res) => {
    res.render("Contacto");
    })

router.post("/Contacto", validationForm, async (req,res) => {        //reg validacion se ejecutan antes de ir a la ruta
    const errors = validationResult (req); 
    if (!errors.isEmpty()) {                                         //si el arreglo donde guardo las validaciones NO esta vacío
        const validData = req.body                                   // validData objeto que trae inputs y su resp. de usuario
        /*console.log(validData)*/                                   //array para rend form si hay errores + hacerlo visible al usuario
        const warningErr = errors.array();
        const nameErr = warningErr.find(nameErr=>nameErr.param==="name")
        const lastNameErr = warningErr.find(lastNameErr=>lastNameErr.param==="lastName")
        const emailErr = warningErr.find(emailErr=>emailErr.param==="email")
        const numberErr = warningErr.find(numberErr=>numberErr.param==="number")
        const msjErr = warningErr.find(msjErr=>msjErr.param==="message")

        /*console.log(errors.array());*/                 
        res.render("Contacto", {warningErr, validData, nameErr, lastNameErr, emailErr, numberErr, msjErr})
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
console.log(mailStatus);
let mailFeedback = "";
if (mailStatus.rejected.length) {
    mailFeedback = "Su mensaje no pudo ser enviado";
    } else {
    mailFeedback = "Mensaje enviado correctamente";    
    }

    res.render("Contacto", {message: mailFeedback})             //! TO CHEK RES.RENDER() RESP FORM + VALID. FRONT
}

})

module.exports = router
