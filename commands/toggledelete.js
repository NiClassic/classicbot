const { writeFileSync, readFileSync } = require("fs");
const { join } = require("path");
const main = require("../bot.js");
const { getConfig } = require("../config_manager");
module.exports.name = "toggledelete";

module.exports.description =
  "If the bot annoys you with its responses, simply make him delete his own messages.";

module.exports.permission = "ADMINISTRATOR";

module.exports.usage = "toggledelete [true|false]";

module.exports.run = async (bot, message, args) => {
  if (args.length == 0) {
    //Get config for server the message was sent from
    let deletemsg = getConfig(message.guild)["deleteOwnMessages"];
    if (deletemsg == null)
      return message.channel.send("☠ Error while reading `config.json`.");
    message.channel.send(
      `ℹ Delete messages from bot is currently set \`${deletemsg}\`.`
    );
  } else {
    if (args[0] === "false" || args[0] === "true") {
      //get whole config file
      let jsondata = JSON.parse(
        readFileSync(join(process.cwd(), "config.json"))
      );
      //get deleteownmessages
      let deletemsg = jsondata[message.guild.id]['deleteOwnMessages'];
      if (deletemsg == null)
        return message.channel.send("☠ Error while reading `config.json`.");
        //set deleteownmessages according to args
      deletemsg = args[0] == "true" ? true : false;
      jsondata[message.guild.id]['deleteOwnMessages'] = deletemsg;
      main.deleteOwnMessages = deletemsg;
      //write config file
      writeFileSync(
        join(process.cwd(), "config.json"),
        JSON.stringify(jsondata, null, 4)
      );
      message.channel.send(
        `ℹ Delete messages from bot is now set \`${deletemsg}\`.`
      );
    } else
      return message.channel.send(`:warning: Wrong usage: \`${this.usage}\`.`);
  }
};

module.exports.matchArgLength = function(argcount) {
  return argcount == 0 || argcount == 1;
};
