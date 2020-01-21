const { commands, prefix, infos } = require("./bot.js");

module.exports.execute = async (bot, message) => {
  let messageArray = message.content.split(" "); //split message by space
  let command = messageArray[0].substr(prefix.length); //get command without prefix
  let args = messageArray.slice(1); //get arguments
  if (commands.get(command) && infos.get(command).permission) {
    if (message.member.hasPermission(infos.get(command).permission)) {
      if (infos.get(command).requiredArgs(args.length)) {
        let commandFile = commands.get(command); //get command file from command map
        commandFile.run(bot, message, args); //If command file exists, run it
      } else message.channel.send(`⚠ Command \`${command}\` requires more/less arguments.`);
    } else
      message.channel.send(`☠ Missing permissions for command \`${command}\`.`);
  } else message.channel.send(`⚠ Command \`${command}\` not found.`);
};
