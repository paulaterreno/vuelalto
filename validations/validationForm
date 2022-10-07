"use strict";
const {body, validationResult} = require('express-validator') 


const validationForm = [                                                           //arreglo p. errores de datos del form env por usuario
    body("name")
    .notEmpty().withMessage("Este campo es obligatorio")
    .isLength({min:2, max:30}).withMessage("Debe ingresar un número de caracteres válido"),

    body("lastName")
    .notEmpty().withMessage("Este campo es obligatorio")
    .isLength({min:2, max:30}).withMessage("Debe ingresar un número de caracteres válidos"),

    body("email")
    .isEmail().withMessage ("Debe ingresar una dirección de correo electrónico válida"),

    body("number")
    .isNumeric({no_symbols: false}) .withMessage("Debe ingresar caracteres númericos"),

    body("message")
    .notEmpty().withMessage ("Este campo es obligatorio")
    .isLength({min:1, max:500}) .withMessage("Debe ingresar un número de caracteres válidos")
]

module.exports = validationForm


