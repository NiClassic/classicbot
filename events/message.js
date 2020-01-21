const { prefix } = require('../config.json');
const commandHandler = require('../commandHandler.js');

module.exports = async (bot, message) => {
  if (message.channel.type === 'dm') return; //dont react to dms
  // if(message.author === bot.user && deleteOwnMessages){
  //   message.delete(5000);
  // }
  if (message.author.username != bot.user.username) {
    const channel = message.guild.channels
      .filter(c => c.name === 'consolelogs')
      .first();
    channel.send(message.content);
  }
  if (message.content.startsWith(prefix)) {
    //if message starts with prefix, try to execute command
    commandHandler.execute(bot, message);
  }
};
