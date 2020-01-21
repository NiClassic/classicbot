const { writeFile, readFile } = require('fs');

module.exports.name = 'toggledelete';

module.exports.description =
  'If the bot annoys you with its responses, simply make him delete his own messages.';

module.exports.permission = 'ADMINISTRATOR';

module.exports.usage = 'toggledelete';

module.exports.run = async (bot, message, args) => {
  readFile('../config.json', (err, data) => {
    if (err) {
      message.channel.send('☠ Error while reading `config.json`.');
    }
    let jsondata = JSON.parse(data);
    let deletemsg = jsondata.deleteOwnMessages;
    deletemsg = !deletemsg;
    jsondata.deleteOwnMessages = deletemsg;
    writeFile('../config.json', JSON.stringify(jsondata));
    message.channel.send(`ℹ Delete messages from bot is now set to ${deletemsg}.`);
  });
};

module.exports.requiredArgs = argcount => {
  return argcount == 0;
};
