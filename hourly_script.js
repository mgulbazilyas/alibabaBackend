var {Product, sequelize} = require('./models');
const TopClient = require('node-taobao-topclient').default;
const TelegramBot = require('node-telegram-bot-api');

const client = new TopClient({
  appkey: '32624659',
  appsecret: '43d5d6e2131951e28c20ffebd4c0ca91',
});


// replace the value below with the Telegram token you receive from @BotFather
const token = '1748725653:AAHaeSnpq7Q4eXuLDVgf1tlf09L0crGEIxk';
const chatId = -618101321;
const infoChatId = -618101321;
// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: false});


  (async () => {

    product = await Product.findOne({where: {posted: null}, order: [
        ['id', 'ASC']
      ]});
    if(product !== null){
        try{

            product;
            const old_affiliate_url = product.affiliateUrl;

            if(product.affiliateUrl === null || product.affiliateUrl === "" || product.affiliateUrl === "edited"){

        console.log(product.sourceUrl)
        var result = await client.execute('aliexpress.affiliate.link.generate', {
          'promotion_link_type': 2,
          'source_values': product.sourceUrl,
          'tracking_id': 'ChromeBotDeals'
        });
        console.log(result);
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
      let title_formatted;
      if( old_affiliate_url === 'edited'){
          title_formatted = title;
      }
      else{
          title_formatted = title.split(' ').splice(0, 7).join(' ');

      }
      await bot.sendPhoto(chatId,
          product.images,
          {caption:
                `${title_formatted}
🛍️מספר הזמנות - ${product.orderCount}
 ✅ דירוג המוצר - ${product.rating}
🛒 מחיר - ${product.price}  ₪
⬅️קישור לרכישה - 
${product.affiliateUrl}
${coupon}
`
          })


      product.posted = true;
      product.save();
      console.log(product);
    }
    catch(err){
        product.posted = false;
        product.save();
        console.log(product);
      await bot.sendMessage(infoChatId, `ID: ${product.id}\nLINK: ${product.sourceUrl}\nGOT ERROR:   ${err.toString()}`);
    }
    }
  })();
