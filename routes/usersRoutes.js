const router = require ('express').Router()
const users = require('../controllers/usersControlers')           //o const {getLoginForm, postLoginForm, getRegisterForm, postRegisterForm} = require('../controllers/usersControlers')
const auth = require('../helpers/auth')                            //imp middleware en rutas privadas (debe estar login.) 

router.get("/login", users.getLoginForm)
router.post("/login", users.postLoginForm)

router.get("/register", users.getRegisterForm)
router.post("/register", users.postRegisterForm)

router.get("/settings", auth, users.getSettings)                                      //confg de cuenta
router.post("/settings", auth, users.postSettings)                                     //procesamos form.

router.get("/delete", auth, users.deleteUser)         //Error: Route.get() requires a callback function but got a [object Undefined]
router.get("/validate", auth, users.validateEmail)

router.get("/logout", users.logout)


module.exports = router;

