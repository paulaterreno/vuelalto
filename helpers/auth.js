const auth =  (req, res, next) => {                                   //middleware: antes de la ruta => si tengo usuario registrado podre ingresar /acces
    if (req.session.user) {                                              //si exsiste la sesión de usuario
        next()                                                          //entrar al controlador
    } else 
    res.redirect("/AuthDenied")
    } 

module.exports = auth 