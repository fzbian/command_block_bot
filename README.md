
# Ryder Discord Bot

a discord bot with multiple commands and functions

## Configuration files
Create a folder called `config`, in it add a file called `bot.js` that should contain the following

    
    module.exports = {
    emojis: {
	    off:  ':x:',
	    error:  ':warning:',
	    queue:  ':bar_chart:',
	    music:  ':musical_note:',
	    success:  ':white_check_mark:',
    },
    discord: {
	    owner:  "YOUR-DISCORD-ID",
	    token:  'TOKEN',
	    prefix:  '!',
	    activity:  'ACTIVITY',
    },
    filters: ['8D', 'gate', 'haas', 'phaser', 'treble', 'tremolo', 'vibrato', 'reverse', 'karaoke', 'flanger', 'mcompand', 'pulsator', 'subboost', 'bassboost', 'vaporwave', 'nightcore', 'normalizer', 'surrounding'],
    };

## Initialize the bot
follow the steps for the installation of the dependencies and others

    npm install
    npm install -g nodemon

### initialization
development

    npm run dev
use

    npm start

## Credits

ZerioDev (Music Code)