const fs = require("fs");
const path = require("path");
const main = require("../bot.js");
module.exports.name = "toggledelete";

module.exports.description =
  "If the bot annoys you with its responses, simply make him delete his own messages.";

module.exports.permission = "ADMINISTRATOR";

module.exports.usage = "toggledelete [true|false]";

module.exports.run = async (bot, message, args) => {
  if (args.length == 0) {
    fs.readFile(path.join(process.cwd(), "config.json"), (err, data) => {
      if (err) {
        message.channel.send("☠ Error while reading `config.json`.");
        console.log(err);
      }
      let jsondata = JSON.parse(data);
      let deletemsg = jsondata.deleteOwnMessages;
      message.channel.send(
        `ℹ Delete messages from bot is currently set \`${deletemsg}\`.`
      );
    });
  } else {
    if (args[0] === "false" || args[0] === "true") {
      fs.readFile(path.join(process.cwd(), "config.json"), (err, data) => {
        if (err) {
          message.channel.send("☠ Error while reading `config.json`.");
          console.log(err);
        }
        let jsondata = JSON.parse(data);
        let deletemsg = jsondata.deleteOwnMessages;
        deletemsg = args[0] == "true" ? true : false;
        jsondata.deleteOwnMessages = deletemsg;
        main.deleteOwnMessages = deletemsg;
        fs.writeFileSync(
          path.join(process.cwd(), "config.json"),
          JSON.stringify(jsondata, null, 4)
        );
        message.channel.send(
          `ℹ Delete messages from bot is now set \`${deletemsg}\`.`
        );
      });
    } else
      return message.channel.send(`:warning: Wrong usage: \`${this.usage}\`.`);
  }
};

module.exports.matchArgLength = function(argcount) {
  return argcount == 0 || argcount == 1;
};
