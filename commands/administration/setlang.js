const { MessageEmbed } = require("discord.js");
const DB = require("better-sqlite3");
const settings = new DB("database/settings.db");

module.exports = {
  name: "setlang",
  description: "Set the language on this server",
  aliases: [],
  category: "administration",
  args: true,
  usage: "<language> (english, spanish)",
  run: async (client, message, args) => {
    //Language
    let file = settings.prepare("SELECT * FROM settings WHERE guildid = ?").get(message.guild.id);
    const guildLanguage = settings.language || "english";
    const language = require(`../../languages/${guildLanguage}`);

    if (args[1]) {
      const embed = new MessageEmbed()
        .setColor("#f4f4f4")
        .setDescription(language("ADMINISTRATION_SETLANG_LANGUAGE_CONTAIN_SPACES"))
        .setTimestamp()
        .setFooter(client.version, client.user.displayAvatarURL());
      let msg = await message.channel.send(embed);
      await msg.delete({ timeout: 10000 });
      message.delete().catch(console.error);
    } else if (
      message.mentions.users.first() ||
      message.mentions.channels.first() ||
      message.mentions.roles.first()
    ) {
      const embed = new MessageEmbed()
        .setColor("#f4f4f4")
        .setDescription(language("ADMINISTRATION_SETLANG_LANGUAGE_CANNOT_BE_A_MENTION"))
        .setTimestamp()
        .setFooter(client.version, client.user.displayAvatarURL());
      let msg = await message.channel.send(embed);
      await msg.delete({ timeout: 10000 });
      message.delete().catch(console.error);
    } else if (file.language === args[0]) {
      const embed = new MessageEmbed()
        .setColor("#f4f4f4")
        .setDescription(language("ADMINISTRATION_SETLANG_LENGUAGE_CANNOT_BE_THE_SAME"))
        .setTimestamp()
        .setFooter(client.version, client.user.displayAvatarURL());
      let msg = await message.channel.send(embed);
      await msg.delete({ timeout: 10000 });
      message.delete().catch(console.error);
    } else {
      let newLanguage = args[0];
      console.log(newLanguage)
      settings
        .prepare("UPDATE settings SET language = ? WHERE guildid = ?")
        .run(args[0], message.guild.id);
      const embed = new MessageEmbed()
        .setColor("#f4f4f4")
        .setDescription(language("ADMINISTRATION_SETLANG_LENGUAGE_HAS_BEEN_REPLACED", newLanguage))
        .setTimestamp()
        .setFooter(client.version, client.user.displayAvatarURL());
      let msg = await message.channel.send(embed);
      await msg.delete({ timeout: 20000 });
      message.delete().catch(console.error);
    }
  },
};
