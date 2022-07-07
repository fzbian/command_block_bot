const languageData = {
    // -- Administration --
    ADMINISTRATION_SETLANG_LANGUAGE_CONTAIN_SPACES: "The language cannot contain spaces.",
    ADMINISTRATION_SETLANG_LANGUAGE_CANNOT_BE_A_MENTION: "The lenguage cannot be a mention.",
    ADMINISTRATION_SETLANG_LENGUAGE_CANNOT_BE_THE_SAME: "The lenguage cannot be the same as the current.",
    ADMINISTRATION_SETLANG_LENGUAGE_HAS_BEEN_REPLACED: (lang) => `The language has been replaced by ${lang}.`,
    ADMINISTRATION_SETPREFIX_PREFIX_CONTAIN_SPACES: "The prefix cannot contain spaces.",
    ADMINISTRATION_SETPREFIX_PREFIX_CANNOT_BE_A_MENTION: "The prefix cannot be a mention.",
    ADMINISTRATION_SETPREFIX_PREFIX_CANNOT_CONTAIN_MORE_THAN_THREE: "The prefix cannot contain more than 3 characters.",
    ADMINISTRATION_SETPREFIX_PREFIX_CANNOT_BE_THE_SAME: "The prefix cannot be the same as the current.",
    ADMINISTRATION_SETPREFIX_PREFIX_HAS_BEEN_REPLACED: (prefix) => `The prefix has been replaced by ${prefix}.`,
    // -- Development --
    // Nothing yet.
    // -- Funny --
    FUNNY_MINECRAFT_CONTAIN_CHARACTERS: "The message cannot contain more than 23 characters.",
    FUNNY_MINECRAFT_LEAST_TWO_CHARACTERS: "The message must contain at least 2 characters.",
    // -- Information --
    INFORMATION_ABOUT_ABOUTABOUT_DEVELOPER: "Developer",
    INFORMATION_ABOUT_ABOUT_PING: "Ping",
    INFORMATION_ABOUT_UPTIME: "Uptime",
    INFORMATION_ABOUT_LIBRARY: "Library",
    INFORMATION_ABOUT_COMMANDS: "Commands",
    INFORMATION_ABOUT_SERVERS: "Servers",
    INFORMATION_ABOUT_USERS: "Users",
    INFORMATION_ABOUT_USERS_HUMANS: "Humans",
    INFORMATION_ABOUT_USERS_ROBOTS: "Robots",
    INFORMATION_HELP: "Help",
    INFORMATION_HELP_DESCRIPTION: "Description",
    INFORMATION_HELP_ALIASES: "Aliases",
    INFORMATION_HELP_ALIASES_HAS_NO: "Has no aliases",
    INFORMATION_HELP_USAGE: "Usage",
    INFORMATION_HELP_COMMAND_NOT_FOUND: (commandName) => `The command \`${commandName}\` was not found.`,
    INFORMATION_HELP_WAIT_A_MOMENT: "Wait a moment...",
    INFORMATION_HELP_COMMANDS_ADMINISTRATION: "Administration",
    INFORMATION_HELP_COMMANDS_FUNNY: "Funny",
    INFORMATION_HELP_COMMANDS_INFORMATION: "Information",
    INFORMATION_HELP_COMMANDS_MODERATION: "Moderation",
    INFORMATION_HELP_COMMANDS_MUSIC: "Music",
    INFORMATION_HELP_COMMANDS_UTILITY: "Utility",
    INFORMATION_HELP_CHECK_PRIVATE_MESSAGES: "Check your private messages",
    INFORMATION_HELP_MESSAGE_NO_POSIBLE_TO_SEND: "It is not possible to send you the message...",
    // -- Moderation Ban --
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
    // -- Moderation Kick --
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
    MODERATION_KICK_KICKED_TO_GUILD_HAS_BEEN_KICKED: (user) => `${user} has been kick from the guild.`,
    // -- Music --
    MUSIC_NOT_IN_VOICE_CHANNEL: "You are not in a voice channel.",
    MUSIC_NOT_IN_SAME_VOICE_CHANNEL: "You are not in the same voice channel.",
    MUSIC_NOT_CURRENTLY_PLAYING: "No music currently playing.",
    MUSIC_CLEAR_QUEUE_ONLY_ONE_SONG_IN_CHANNEL: "There is only one song in the queue.",
    MUSIC_CLEAR_QUEUE_HAS_JUST_BEEN_REMOVED: "The queue has just been removed.",
    MUSIC_FILTER_SPECIFY_FILTER: "Please specify a valid filter to enable or disable.",
    MUSIC_FILTER_DOESNOT_EXIST: "This filter does not exist, try again.",
    MUSIC_FILTER_ADDING_FILTER: "I am adding the filter to the music, please wait... The longer the music is, the longer this will take.",
    MUSIC_FILTER_DISABLING_FILTER: "I am disabling the filter to the music, please wait... The longer the music is, the longer this will take.",
    MUSIC_LOOP_DISABLE: "Repeat mode disabled.",
    MUSIC_LOOP_ENABLE: "Repeat mode enabled, the whole queue will be repeated enlessly.",
    MUSIC_NOW_PLAYING_CHANNEL: "Channel",
    MUSIC_NOW_PLAYING_REQUESTED_BY: "Requested by",
    MUSIC_NOW_PLAYING_FROM_PLAYLIST: "From playlist",
    MUSIC_NOW_PLAYING_YES: "Yes",
    MUSIC_NOW_PLAYING_NO: "No",
    MUSIC_NOW_PLAYING_VIEWS: "Views",
    MUSIC_NOW_PLAYING_DURATION: "Duration",
    MUSIC_NOW_PLAYING_VOLUME: "Volume",
    MUSIC_NOW_PLAYING_REPEAT_MODE: "Repeat mode",
    MUSIC_NOW_PLAYING_CURRENTLY_PAUSED: "Currently paused",
    MUSIC_NOW_PLAYING_PROGRSS_BAR: "Progress bar",
    MUSIC_PAUSE_ALREDY_PAUSED: "The music is alredy paused.",
    MUSIC_PAUSE_SONG_PAUSED: (song) => `${song} paused.`,
    MUSIC_PLAY_INDICATE_TITLE_SONG: "Please indicate the title of a song."
};

const translate = (key, ...args) => {
    const translation = languageData[key]; 
    if(typeof translation === "function") return translation(args);
    else return translation;
};

module.exports = translate;