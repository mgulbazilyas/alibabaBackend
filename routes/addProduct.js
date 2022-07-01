var express = require('express');
var router = express.Router();
var {Product} = require('../models');

/* GET home page. */
router.get('/', function(req, res, next) {

    res.send({"status": 400, data: "Get Method not allowed"});
});

router.post('/', function(req, res, next) {
    let body = req.body;
    Product.create(body.payload).then(resp => {
        res.send({"status": 200, data: body});

    }).catch(e => {
        throw e;
    });

});

module.exports = router;
