const Discord = require("discord.js");
const math = require("math-expression-evaluator");
const DB = require("better-sqlite3");
const settings = new DB("database/settings.db");

module.exports = {
  name: "math",
  description: "Command for arithmetic operations",
  aliases: [],
  category: "utility",
  args: true,
  usage: "<operation>",
  run: async (client, message, args) => {
    //Language
    let file = settings.prepare("SELECT * FROM settings WHERE guildid = ?").get(message.guild.id);
    const guildLanguage = settings.language || "english";
    const language = require(`../../languages/${guildLanguage}`);
    
    try {
      let operation = args.join(" ")
      let result = math.eval(operation);
      const embed = new Discord.MessageEmbed()
        .setColor("#f4f4f4")
        .addField(language("MATH_OUTPUT"), `\`\`\`xl\n${operation} = ${result}\n\`\`\``);
      let msg = await message.channel.send(embed);
      await msg.delete({ timeout: 10000 });
      message.delete().catch(console.error);
    } catch (err) {
      const embed = new Discord.MessageEmbed()
        .setColor("#f4f4f4")
        .addField(language("MATH_OUTPUT"), `\`\`\`diff\n- ${language("MATH_INVALID_ENTRY")}\n\`\`\``);
      let msg = await message.channel.send(embed);
      await msg.delete({ timeout: 20000 });
      message.delete().catch(console.error);
    }
  }
};