var express = require('express');
var router = express.Router();
var {Product} = require('../models');
const {default: TopClient} = require("node-taobao-topclient");
const TelegramBot = require("node-telegram-bot-api");
const token = '1748725653:AAHaeSnpq7Q4eXuLDVgf1tlf09L0crGEIxk';
const chatId = -618101321;

const client = new TopClient({
    appkey: '32624659',
    appsecret: '43d5d6e2131951e28c20ffebd4c0ca91',
});

/* GET home page. */
router.get('/', function(req, res, next) {

    res.send({"status": 400, data: "Get Method not allowed"});
});

router.get('/test-telegram-message', function(req, res, next) {



// replace the value below with the Telegram token you receive from @BotFather

// Create a bot that uses 'polling' to fetch new updates
    try{

    const bot = new TelegramBot(token, {polling: false});


    (async () => {
        product = await Product.findOne({where: {posted: null}, order: [
            ['id', 'DESC']
            ]});
        if(product !== null){
            product;
            if(product.affiliateUrl === null || product.affiliateUrl === ""){

                var result = await client.execute('aliexpress.affiliate.link.generate', {
                    'promotion_link_type': 2,
                    'source_values': product.sourceUrl,
                    'tracking_id': 'ChromeBotDeals'
                });
                const link = result.resp_result.result.promotion_links.promotion_link[0].promotion_link;


                product.affiliateUrl = link;
            }else{
                console.log(product.affiliateUrl)
            }

            const coupons = JSON.parse(product.coupon);
            let coupon = '';
            for (const coupon1 of coupons) {
                coupon = coupon + '\n🎁' + coupon1;
            }
            let title = product.title;


            let title_formatted = title.split(' ').splice(0, 7).join(' ');
            await bot.sendPhoto(chatId,
product.images,
                {caption:
`${title_formatted}
🛍️מספר הזמנות:${product.orderCount}.
 ✅ דירוג המוצר:${product.rating}.
🛒 מחיר:${product.price}  ₪.
 :קישור לרכישה ⬅️
${product.affiliateUrl}
${coupon}
`
                })
            res.send({status: 200, data: "Sent Successfully"});

            // product.posted = true;
            product.save()
            // console.log(product)
        }
    })();
    }catch (e) {
        res.send(e);
    }


});

module.exports = router;


