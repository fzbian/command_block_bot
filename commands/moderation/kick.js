const Discord = require("discord.js");
const DB = require("better-sqlite3");
const settings = new DB("database/settings.db");

module.exports = {
    name: "kick",
    description: "Kick a member who breaks the rules",
    aliases: [],
    category: "moderation",
    args: true,
    usage: "<@member|id> [reason]",
	run: async (client, message, args) => {
    //Language
    let file = settings.prepare("SELECT * FROM settings WHERE guildid = ?").get(message.guild.id);
    const guildLanguage = settings.language || "english";
    const language = require(`../../languages/${guildLanguage}`);

	let member = message.guild.members.cache.get(args[0].replace(/[<@!>]/g, ""));
    let reason = (args.slice(1).join(" ") || language("MODERATION_KICK_REASON_NO_SPECIFIED"));
    if (!message.guild.me.hasPermission("BAN_MEMBERS")) {
      const embed = new Discord.MessageEmbed()
        .setColor("#f4f4f4")
        .setTitle(message.author.tag)
        .setDescription(language("MODERATION_KICK_I_NEED_PERMISSIONS"))
        .setTimestamp()
        .setFooter(client.version, client.user.displayAvatarURL());
      let msg = await message.channel.send(embed);
      await msg.delete({ timeout: 10000 });
    } else if (!message.member.hasPermission("BAN_MEMBERS")) {
      const embed = new Discord.MessageEmbed()
        .setColor("#f4f4f4")
        .setTitle(message.author.tag)
        .setDescription(language("MODERATION_KICK_YOU_NEED_PREMISSIONS"))
        .setTimestamp()
        .setFooter(client.version, client.user.displayAvatarURL());
      let msg = await message.channel.send(embed);
      await msg.delete({ timeout: 10000 });
    } else if (!member) {
      const embed = new Discord.MessageEmbed()
        .setColor("#f4f4f4")
        .setTitle(message.author.tag)
        .setDescription(language("MODERATION_KICK_YOU_NEED_PUT_VALID_USER"))
        .setTimestamp()
        .setFooter(client.version, client.user.displayAvatarURL());
      let msg = await message.channel.send(embed);
      msg.delete({ timeout: 10000 });
    } else if (!member.bannable) {
      const embed = new Discord.MessageEmbed()
        .setColor("#f4f4f4")
        .setTitle(message.author.tag)
        .setDescription(language("MODERATION_KICK_I_CANT_BAN_THIS_MEMBER"))
        .setTimestamp()
        .setFooter(client.version, client.user.displayAvatarURL());
      let msg = await message.channel.send(embed);
      msg.delete({ timeout: 10000 });
    } else if (member.roles.highest.comparePositionTo(message.member.roles.highest) > 0) {
      const embed = new Discord.MessageEmbed()
        .setColor("#f4f4f4")
        .setTitle(message.author.tag)
        .setDescription(language("MODERATION_KICK_YOU_DONT_BAN_THIS_MEMBER"))
        .setTimestamp()
        .setFooter(client.version, client.user.displayAvatarURL());
      let msg = await message.channel.send(embed);
      msg.delete({ timeout: 10000 });
    } else {
      const embed = new Discord.MessageEmbed()
        .setColor("#f4f4f4")
        .setTitle(member.user.tag)
        .setDescription(`${language("MODERATION_KICK_KICKED_TO_USER_YOU_HAVE_KICKED", message.guild.name)}\n${language("MODERATION_KICK_KICKED_TO_USER_YOU_HAVE_KICKED_AUTHOR", message.author.tag)}\n${language("MODERATION_KICK_KICKED_TO_USER_YOU_HAVE_KICKED_REASON", reason)}`)
        .setTimestamp()
        .setFooter(client.version, client.user.displayAvatarURL());
      await member.send(embed);
        member.kick({ reason: `${member.user.tag} (ID: ${member.user.id}) ` + language("MODERATION_KICK_KICKED_TO_GUILD_SERVER_LOG") + ` ${message.author.tag} (ID: ${message.author.id}), ` + language("MODERATION_KICK_KICKED_TO_GUILD_SERVER_LOG_REASON", reason)}).then(async () => {
        const embed = new Discord.MessageEmbed()
          .setColor("#f4f4f4")
          .setTitle(message.author.tag)
          .setDescription(language("MODERATION_KICK_KICKED_TO_GUILD_HAS_BEEN_KICKED", member.user.tag))
          .setTimestamp()
          .setFooter(client.version, client.user.displayAvatarURL());
        let msg = await message.channel.send(embed)
        msg.delete({ timeout: 10000 })
      }).catch(console.error)
    }
    message.delete().catch(console.error);
	}
};