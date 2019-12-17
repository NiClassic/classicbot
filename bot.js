const { RichEmbed, Client } = require("discord.js"); //import discord library
const { token, prefix } = require("./config.json"); //import config file

const bot = new Client({ disableEveryone: true }); //create bot

bot.on("ready", () => {
  console.log("bot logged in!");
});

bot.login(token);
