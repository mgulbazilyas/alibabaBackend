var express = require('express');
var router = express.Router();
var {Product} = require('../models');

/* GET home page. */
router.get('/', function(req, res, next) {

    res.send({"status": 400, data: "Get Method not allowed"});
});

router.post('/', async function (req, res, next) {
    let body = req.body;
    let product = await Product.findOne({
        where: {
            sourceUrl: body.payload.sourceUrl,
        }
    });
    if (product == null || product === {}) {
        Product.create(body.payload).then(resp => {
            res.send({"status": 200, data: body});

        }).catch(e => {
            next(e);
        });
    } else {
        res.status(400).send({"status": 400, error: "already Exists", product})
    }


});

module.exports = router;
