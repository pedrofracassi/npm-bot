const npmapi = require('api-npm');
const Discord = require('discord.js');
const config = require('./config.json');
const client = new Discord.Client();
const embedColor = 0xC12127;
const expression = /([+][n][p][m])(\ *)(.*)/;

function message(message) {
  if (message.content.match(expression)) {
    var embed = new Discord.RichEmbed();
    var packagename = message.content.match(expression)[3].replace(' ', '-');
    if (packagename) {
      message.channel.startTyping();
      npmapi.getdetails(encodeURI(packagename), data => {
        if (data.name) {
          embed.setColor(embedColor);
          embed.setAuthor(data.name, 'https://i.imgur.com/24yrZxG.png', 'https://www.npmjs.com/package/' + data.name);
          embed.setDescription(data.description + '\nhttps://www.npmjs.com/package/' + data.name + '\n\n`npm install --save ' + data.name + '`');
        } else {
          embed.setColor(embedColor);
          embed.setAuthor('No package with the name "' + packagename + '" was found on npm.', 'https://i.imgur.com/24yrZxG.png');
          embed.setDescription('Please check if you spelled the package name correctly.');
        }
        message.channel.stopTyping();
        message.channel.send({embed});
      });
    } else {
      embed.setColor(embedColor);
      embed.setAuthor('You need to specify a package name.', 'https://i.imgur.com/24yrZxG.png');
      embed.setDescription('**Usage:** `+npm <package name>`');
      message.channel.stopTyping();
      message.channel.send({embed});
    }
  }
};

client.login(config.discord_token);
client.on('message', message);
client.on('ready', () => {
  console.log('Logged in as ' + client.user.tag);
  client.user.setGame('+npm <package>');
});
