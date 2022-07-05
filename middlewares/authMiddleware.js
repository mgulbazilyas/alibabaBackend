const {authKey, authValue} = require("../constant");

const AuthMiddleware = (req, res, next) => {
    if (req.cookies[authKey] === authValue) {
        return next();
    }
     res.redirect('/auth/login/');
};

const ApiAuthMiddleware = (req, res, next) => {
    const apiKey = req.body[authKey]
    console.log(apiKey, authValue);
    if(apiKey === authValue){
        return next();
    }
     return res.status(401).send({
        error: 'Not logged in'
    });
};

module.exports = {
    AuthMiddleware,
    ApiAuthMiddleware,
};
