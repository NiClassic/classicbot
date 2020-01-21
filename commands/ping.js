module.exports.name = 'ping';

module.exports.description = 'What do ya expect from a ping command?';

module.exports.permission = 'ADMINISTRATOR'

module.exports.usage = 'ping';

module.exports.run = async (bot, message, args) => {
    console.log("pong!");
}

module.exports.requiredArgs = argcount => {
    return argcount == 0;
};