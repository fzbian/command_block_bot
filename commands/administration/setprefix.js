const { MessageEmbed } = require("discord.js");
const DB = require("better-sqlite3");
const settings = new DB("database/settings.db");

module.exports = {
  name: "setprefix",
  description: "Set the bot prefix on this server",
  aliases: [],
  category: "administration",
  args: true,
  usage: "<prefix> (max 3 characters)",
  run: async (client, message, args) => {
    //Language
    let file = settings.prepare("SELECT * FROM settings WHERE guildid = ?").get(message.guild.id);
    const guildLanguage = settings.language || "english";
    const language = require(`../../languages/${guildLanguage}`);
    
    if (args[1]) {
      const embed = new MessageEmbed()
        .setColor("#f4f4f4")
        .setDescription(language("ADMINISTRATION_SETPREFIX_PREFIX_CONTAIN_SPACES"))
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
        .setDescription(language("ADMINISTRATION_SETPREFIX_PREFIX_CANNOT_BE_A_MENTION"))
        .setTimestamp()
        .setFooter(client.version, client.user.displayAvatarURL());
      let msg = await message.channel.send(embed);
      await msg.delete({ timeout: 10000 });
      message.delete().catch(console.error);
    } else if (args[0].length > 3) {
      const embed = new MessageEmbed()
        .setColor("#f4f4f4")
        .setDescription(language("ADMINISTRATION_SETPREFIX_PREFIX_CANNOT_CONTAIN_MORE_THAN_THREE"))
        .setTimestamp()
        .setFooter(client.version, client.user.displayAvatarURL());
      let msg = await message.channel.send(embed);
      await msg.delete({ timeout: 10000 });
      message.delete().catch(console.error);
    } else if (file.prefix === args[0]) {
      const embed = new MessageEmbed()
        .setColor("#f4f4f4")
        .setDescription(language("ADMINISTRATION_SETPREFIX_PREFIX_CANNOT_BE_THE_SAME"))
        .setTimestamp()
        .setFooter(client.version, client.user.displayAvatarURL());
      let msg = await message.channel.send(embed);
      await msg.delete({ timeout: 10000 });
      message.delete().catch(console.error);
    } else {
      let newPrefix = args[0]
      settings
        .prepare("UPDATE settings SET prefix = ? WHERE guildid = ?")
        .run(args[0], message.guild.id);
      const embed = new MessageEmbed()
        .setColor("#f4f4f4")
        .setDescription(language("ADMINISTRATION_SETPREFIX_PREFIX_HAS_BEEN_REPLACED", newPrefix))
        .setTimestamp()
        .setFooter(client.version, client.user.displayAvatarURL());
      let msg = await message.channel.send(embed);
      await msg.delete({ timeout: 20000 });
      message.delete().catch(console.error);
    }
  },
};
