const { Client } = require("discord.js"); //import discord library
const { token, prefix } = require("./config.json"); //import config file
const { readdir } = require("fs"); //import filestream library
const bot = new Client({ disableEveryone: true }); //create bot
module.exports.commands = new Map(); //map with Command name and command executable
module.exports.infos = new Map(); //map with command name and its infos
module.exports.prefix = prefix;

//Load events
readdir("./events/", (err, files) => {
  if (err) return console.error(err);
  let jsfiles = files.filter(file => file.endsWith("js"));
  jsfiles.forEach(file => {
    const event = require(`./events/${file}`);
    let eventName = file.split(".")[0];
    bot.on(eventName, event.bind(null, bot));
    console.log(`[evt] Event ${eventName} loaded successfully ✔`);
  });
});

//Load commands
readdir("./commands", (err, files) => {
  if (err) return console.error;
  let jsfiles = files.filter(file => file.endsWith(".js"));
  if (jsfiles.length === 0) return;
  jsfiles.forEach(file => {
    let cmd = require(`./commands/${file}`);
    let cmdname = cmd.name;
    let cmdpermission = cmd.permission;
    let cmddescription = cmd.description;
    let cmdrequiredargs = cmd.requiredArgs;
    this.commands.set(cmdname, cmd);
    this.infos.set(cmdname, {
      permission: cmdpermission,
      description: cmddescription,
      requiredArgs: cmdrequiredargs
    });
    console.log(`[cmd] Command ${cmdname} loaded successfully ✔`);
  });
});

bot.login(token);
