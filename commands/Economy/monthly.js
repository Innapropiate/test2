const {MessageEmbed} = require("discord.js");
const config = require(`${process.cwd()}/botconfig/config.json`);
var ee = require(`${process.cwd()}/botconfig/embed.json`);
const emoji = require(`${process.cwd()}/botconfig/emojis.json`);
const { parseMilliseconds, duration, GetUser, nFormatter, ensure_economy_user } = require(`${process.cwd()}/handlers/functions`)
module.exports = {
  name: "monthly",
  category: "💸 Economy",
  description: "Earn your monthly cash",
  usage: "monthly",
  type: "earn",
  run: async (client, message, args, cmduser, text, prefix) => {
    
    let es = client.settings.get(message.guild.id, "embed");let ls = client.settings.get(message.guild.id, "language")
        if(!client.settings.get(message.guild.id, "ECONOMY")){
          return message.reply({embeds: [new MessageEmbed()
            .setColor(es.wrongcolor)
            .setFooter(client.getFooter(es))
            .setTitle(client.la[ls].common.disabled.title)
            .setDescription(require(`${process.cwd()}/handlers/functions`).handlemsg(client.la[ls].common.disabled.description, {prefix: prefix}))
          ]});
        }
    try {
      //command
      var user = message.author
      if(user.bot) return message.reply(eval(client.la[ls]["cmds"]["economy"]["monthly"]["variable1"]))
      
      //ensure the economy data
      ensure_economy_user(client, message.guild.id, user.id)
      //get the economy data 
      let data = client.economy.get(`${message.guild.id}-${user.id}`)
      //get the delays
      let timeout = 86400000*30;

      if(data.monthly !== 0 && timeout - (Date.now() - data.monthly) > 0){
        let time = duration(timeout - (Date.now() - data.monthly));
        return message.reply({embeds: [new MessageEmbed()
          .setColor(es.wrongcolor)
          .setFooter(message.author.tag, message.author.displayAvatarURL({dynamic: true}))
          .setTitle(eval(client.la[ls]["cmds"]["economy"]["monthly"]["variable2"]))
          .setDescription(eval(client.la[ls]["cmds"]["economy"]["monthly"]["variable3"]))]
        });
      } 
      //YEA
      else {
        let amountarray = [300*12.5, 350*12.5, 400*12.5, 340*12.5, 360*12.5, 350*12.5, 355*12.5, 345*12.5, 365*12.5, 350*12.5, 340*12.5, 360*12.5, 325*12.5, 375*12.5, 312.5*12.5, 387.5*12.5];
        let amount = Math.floor(amountarray[Math.floor((Math.random() * amountarray.length))]);
        amount = amount * data.black_market.boost.multiplier
        //add the Money to the User's Balance in this Guild
        client.economy.math(`${message.guild.id}-${message.author.id}`, "+", amount, "balance")
        //set the current time to the db
        client.economy.set(`${message.guild.id}-${message.author.id}`, Date.now(), "monthly")
        //get the new data
        data = client.economy.get(`${message.guild.id}-${message.author.id}`)
        //return some message!
        return message.reply({embeds: [new MessageEmbed()
          .setColor(es.color).setThumbnail(es.thumb ? es.footericon && (es.footericon.includes("http://") || es.footericon.includes("https://")) ? es.footericon : client.user.displayAvatarURL() : null)
          .setFooter(message.author.tag, message.author.displayAvatarURL({dynamic: true}))
          .setTitle(eval(client.la[ls]["cmds"]["economy"]["monthly"]["variable4"]))
          .setDescription(eval(client.la[ls]["cmds"]["economy"]["monthly"]["variable5"]))
        ]});
      }
    } catch (e) {
      console.log(String(e.stack).grey.bgRed)
      return message.reply({embeds: [new MessageEmbed()
        .setColor(es.wrongcolor).setFooter(client.getFooter(es))
        .setTitle(client.la[ls].common.erroroccur)
        .setDescription(eval(client.la[ls]["cmds"]["economy"]["monthly"]["variable6"]))
      ]});
    }
  }
};
/**
 * @INFO
 * Bot Coded by Mike | https://redmibot.es/
 * @INFO
 * Work for Milrato Development | https://redmibot.es/
 * @INFO
 * Please mention him / Milrato Development, when using this Code!
 * @INFO
 */
