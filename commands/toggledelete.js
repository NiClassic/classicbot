const fs = require('fs');
const path = require('path');
const { getOwnDeleteMessages } = require('../bot.js');
module.exports.name = 'toggledelete';

module.exports.description =
  'If the bot annoys you with its responses, simply make him delete his own messages.';

module.exports.permission = 'ADMINISTRATOR';

module.exports.usage = 'toggledelete [true|false]';

module.exports.run = async (bot, message, args) => {
  if (args.length == 0) {
    return message.channel.send(
      `ℹ Toggledelete is currently set to: \`${await getOwnDeleteMessages()}\``
    );
  } else {
    fs.readFile(path.join(process.cwd(), 'config.json'), (err, data) => {
      if (err) {
        message.channel.send('☠ Error while reading `config.json`.');
        console.log(err);
      }
      let jsondata = JSON.parse(data);
      let deletemsg = jsondata.deleteOwnMessages;
      deletemsg = !deletemsg;
      jsondata.deleteOwnMessages = deletemsg;
      fs.writeFileSync(
        path.join(process.cwd(), 'config.json'),
        JSON.stringify(jsondata)
      );
      message.channel.send(
        `ℹ Delete messages from bot is now set \`${deletemsg}\`.`
      );
    });
  }
};

module.exports.matchArgLength = function(argcount) {
  return argcount == 0 || argcount == 1;
};
