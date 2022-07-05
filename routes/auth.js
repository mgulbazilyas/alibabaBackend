var express = require('express');
const {authKey, USERNAME, PASSWORD, authValue} = require("../constant");
var router = express.Router();

/* GET users listing. */
router.get('/login', function(req, res, next) {
    res.render('login');
});
router.post('/login', function(req, res, next) {
    const {username, password} = req.body;
    if(username === USERNAME && password === PASSWORD){
        res.cookie(authKey, authValue, { maxAge: 900000 }).redirect('/products');
    }
    else{
        res.render('login', {'message': 'Wrong combination'});
    }
});

router.get('/logout', function(req, res, next) {
    res.send('respond with a resource');
});

module.exports = router;
