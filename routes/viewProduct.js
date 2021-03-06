var express = require('express');
var router = express.Router();
var {Product} = require('../models');
const path = require("path");

/* GET home page. */
router.get('/', async function (req, res, next) {
    var products = await Product.findAll({order:[
        ['posted', 'ASC']
        ]});
    res.render('products', {title: 'Express', products: products});
});

router.post('/delete-all', async function(req, res, next){
    let resp = await Product.destroy(
        {
            where: {},
            truncate: true
        }
    );
    res.send({"status": 200, "response": resp})
});

router.post('/delete/:id', async function(req, res, next){
    let resp = await Product.destroy({
        where: {
            id: req.params.id,
        }
    });
    res.send({"status": 200, "response": resp})
});

router.get('/edit/:id/', async function (req, res, next) {
    const {id} = req.params;
    const product = await Product.findByPk(id);
    if (product === null) {
        res.status(404).send('error');
    } else {
        res.render('edit-product', {title: 'Express', product});
    }

});


router.post('/edit/:id/', async function (req, res, next) {
    const {id} = req.params;



    const product = await Product.findByPk(id);
    if (product === null) {
        res.status(404).send('error');
    } else {
        const {title, price, image} = req.body;
        product.price = price;
        product.title = title;
        product.images = image;
        product.affiliateUrl = 'edited';
        await product.save();
        res.render('edit-product', {title: 'Express', product, message: "Updated"});
    }

});


module.exports = router;
