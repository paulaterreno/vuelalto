function getLoginForm (req, res, next) {
    res.render("LoginForm")                                           //   /users/login
};

function postLoginForm (req, res, next) {
    res.render(req.body)
};


function getRegisterForm (req, res, next) {
    res.send("Form. registro")
};

function postRegisterForm (req, res, next) {
    res.render(req.body)
    };


module.exports = {getLoginForm, postLoginForm, getRegisterForm, postRegisterForm}