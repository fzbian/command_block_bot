const { MessageEmbed } = require("discord.js");
const superagent = require("superagent");
const minecraft = require("../../supplies/jsons/achievements.json");
const DB = require("better-sqlite3");
const settings = new DB("database/settings.db");

module.exports = {
	name: "minecraft",
	description: "Send image in the form of achievements minecraft",
	aliases: [],
  category: "funny",
  args: true,
  usage: "<message> (min 2 characters & max 23)",
	run: async (client, message, args) => {
    //Language
    let file = settings.prepare("SELECT * FROM settings WHERE guildid = ?").get(message.guild.id);
    const guildLanguage = settings.language || "english";
    const language = require(`../../languages/${guildLanguage}`);

    try {
      if (args.join(" ").length > 23) {
        const embed = new MessageEmbed()
          .setColor("#f4f4f4")
          .setDescription(language("FUNNY_MINECRAFT_CONTAIN_CHARACTERS"))
          .setTimestamp()
          .setFooter(client.version, client.user.displayAvatarURL());
        let msg = await message.channel.send(embed);
        await msg.delete({ timeout: 10000 });
        message.delete().catch(console.error);
      } else if (args.join(" ").length < 2) {
       const embed = new MessageEmbed()
          .setColor("#f4f4f4")
          .setDescription(language("FUNNY_MINECRAFT_LEAST_TWO_CHARACTERS"))
          .setTimestamp()
          .setFooter(client.version, client.user.displayAvatarURL());
        let msg = await message.channel.send(embed);
        await msg.delete({ timeout: 10000 });
        message.delete().catch(console.error);
      } else {
        const { body } = await superagent.get(minecraft[Math.floor(Math.random() * minecraft.length)]).query({ h: "Achievement Get!", t: args.join(" ") });
        await message.channel.send({ files: [{ attachment: body, name: "achievement.jpg" }] });
        message.delete().catch(console.error);
      }
    } catch (err) {
      console.error(err);
    }
	}
};