const router = require ('express').Router()
const users = require('../controllers/usersControlers')           //o const {getLoginForm, postLoginForm, getRegisterForm, postRegisterForm} = require('../controllers/usersControlers')

router.get("/login", users.getLoginForm)
router.post("/login", users.postLoginForm)

router.get("/register", users.getRegisterForm)
router.post("/register", users.postRegisterForm)

module.exports = router;

