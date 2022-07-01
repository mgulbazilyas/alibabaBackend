var {Product, sequelize} = require('./models');
const TopClient = require('node-taobao-topclient').default;
const TelegramBot = require('node-telegram-bot-api');

const client = new TopClient({
  appkey: '32624659',
  appsecret: '43d5d6e2131951e28c20ffebd4c0ca91',
});


// replace the value below with the Telegram token you receive from @BotFather
const token = '1748725653:AAHaeSnpq7Q4eXuLDVgf1tlf09L0crGEIxk';
const chatId = '618101321';
// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: false});


(async () => {
  product = await Product.findOne({where: {posted: null}});
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

    product.save()
    console.log(product)
  }
})();
