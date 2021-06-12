const languageData = {
    ADMINISTRATION_SETLANG_LANGUAGE_CONTAIN_SPACES: "The language cannot contain spaces.",
    ADMINISTRATION_SETLANG_LANGUAGE_CANNOT_BE_A_MENTION: "The lenguage cannot be a mention.",
    ADMINISTRATION_SETLANG_LENGUAGE_CANNOT_BE_THE_SAME: "The lenguage cannot be the same as the current.",
    ADMINISTRATION_SETLANG_LENGUAGE_HAS_BEEN_REPLACED: (lang) => `The language has been replaced by ${lang}.`,
    ADMINISTRATION_SETPREFIX_PREFIX_CONTAIN_SPACES: "The prefix cannot contain spaces.",
    ADMINISTRATION_SETPREFIX_PREFIX_CANNOT_BE_A_MENTION: "The prefix cannot be a mention.",
    ADMINISTRATION_SETPREFIX_PREFIX_CANNOT_CONTAIN_MORE_THAN_THREE: "The prefix cannot contain more than 3 characters.",
    ADMINISTRATION_SETPREFIX_PREFIX_CANNOT_BE_THE_SAME: "The prefix cannot be the same as the current.",
    ADMINISTRATION_SETPREFIX_PREFIX_HAS_BEEN_REPLACED: (prefix) => `The prefix has been replaced by ${prefix}.`,
    FUNNY_MINECRAFT_CONTAIN_CHARACTERS: "The message cannot contain more than 23 characters.",
    FUNNY_MINECRAFT_LEAST_TWO_CHARACTERS: "The message must contain at least 2 characters.",
    MODERATION_BAN_REASON_NO_SPECIFIED: "Reason not specified.",
    MODERATION_BAN_I_NEED_PERMISSIONS: "I need permissions to ban.",
    MODERATION_BAN_YOU_NEED_PREMISSIONS: "You need permissions to ban.",
    MODERATION_BAN_YOU_NEED_PUT_VALID_USER: "You need put a valid user.",
    MODERATION_BAN_I_CANT_BAN_THIS_MEMBER: "I can't ban this member.",
    MODERATION_BAN_YOU_DONT_BAN_THIS_MEMBER: "You don't ban this member.",
    MODERATION_BAN_BANNED_TO_USER_YOU_HAVE_BANNED: (guild) => `You have been banned from ${guild}.`,
    MODERATION_BAN_BANNED_TO_USER_YOU_HAVE_BANNED_AUTHOR: (user) => `Author: ${user}.`,
    MODERATION_BAN_BANNED_TO_USER_YOU_HAVE_BANNED_REASON: (text) => `Reason: ${text}.`,
    MODERATION_BAN_BANNED_TO_GUILD_SERVER_LOG: `has been banned by`,
    MODERATION_BAN_BANNED_TO_GUILD_SERVER_LOG_REASON: (reason) => `the reason was: ${reason}`,
    MODERATION_BAN_BANNED_TO_GUILD_HAS_BEEN_BANNED: (user) => `${user} has been banned from the guild.`,
    // -- ! --
    MODERATION_KICK_REASON_NO_SPECIFIED: "Reason not specified",
    MODERATION_KICK_I_NEED_PERMISSIONS: "I need permissions to kick.",
    MODERATION_KICK_YOU_NEED_PREMISSIONS: "You need permissions to kick.",
    MODERATION_KICK_YOU_NEED_PUT_VALID_USER: "You need put a valid user.",
    MODERATION_KICK_I_CANT_BAN_THIS_MEMBER: "I can't kick this member.",
    MODERATION_KICK_YOU_DONT_BAN_THIS_MEMBER: "You don't kick this member.",
    MODERATION_KICK_KICKED_TO_USER_YOU_HAVE_KICKED: (guild) => `You have been kicked from ${guild}.`,
    MODERATION_KICK_KICKED_TO_USER_YOU_HAVE_KICKED_AUTHOR: (user) => `Author: ${user}.`,
    MODERATION_KICK_KICKED_TO_USER_YOU_HAVE_KICKED_REASON: (text) => `Reason: ${text}.`,
    MODERATION_KICK_KICKED_TO_GUILD_SERVER_LOG: `has been kicked by`,
    MODERATION_KICK_KICKED_TO_GUILD_SERVER_LOG_REASON: (reason) => `the reason was: ${reason}`,
    MODERATION_KICK_KICKED_TO_GUILD_HAS_BEEN_KICKED: (user) => `${user} has been kick from the guild.`
};

const translate = (key, ...args) => {
    const translation = languageData[key]; 
    if(typeof translation === "function") return translation(args);
    else return translation;
};

module.exports = translate;