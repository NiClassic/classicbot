const { RichEmbed } = require('discord.js');
const { infos, commands, prefix } = require('../bot.js');
module.exports.name = 'help';

module.exports.description =
  'Send help for a specific command or for all commands';

module.exports.permission = 'SEND_MESSAGES';

module.exports.usage = 'help';

module.exports.run = async (bot, message, args) => {
  let command = args[0];
  let helpEmbed = new RichEmbed()
    .setTitle(
      command
        ? `Help for command \`${command
            .split('')[0]
            .toUpperCase()}${command.substring(1)}\``
        : 'All commands'
    )
    .setColor('#0be02f')
    .setTimestamp()
    .setFooter(bot.user.username, bot.user.displayAvatarURL);
  if (!command) {
    infos.forEach((value, key) => {
      helpEmbed.addField(prefix + value.usage, value.description);
    });
    return message.channel.send(helpEmbed);
  } else {
    if (commands.has(command)) {
      helpEmbed.addField(prefix + 
        infos.get(command).usage,
        infos.get(command).description
      );
      return message.channel.send(helpEmbed);
    } else return message.channel.send(`⚠ Command \`${command}\` not found.`);
  }
};

module.exports.requiredArgs = argcount => {
  return argcount == 0 || argcount == 1;
};
