const { getPrefix } = require("../config_manager");
const commandHandler = require("../commandHandler");

module.exports = async (bot, message) => {
  if (message.channel.type === "dm") return; //dont react to dms
  if (
    message.author.username == bot.user.username &&
    require("../bot.js").deleteOwnMessages
  ) {
    message.delete(5000);
  }
  if (message.author != bot.user) {
    const channel = message.guild.channels
      .filter(c => c.name === "consolelogs")
      .first();
    channel.send(message.content);
  }
  if (message.author == bot.user) return;
  let prefix = getPrefix(message.guild);
  if (message.content.startsWith(prefix)) {
    //if message starts with prefix, try to execute command
    commandHandler.execute(bot, message);
  }
};
