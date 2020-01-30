const { writeFile } = require("fs");
const { join } = require("path");
const cfgman = require("../config_manager.js");

module.exports = bot => {
  console.log("Bot booted up successfully ✔");
    let json = {};
    bot.guilds.forEach(guild => {
      json[guild.id] = {
        prefix: "!",
        deleteOwnMessages: false
      };
      writeFile(
        join(process.cwd(), "config.json"),
        JSON.stringify(json, null, 4),
        (err) => {
          if (err) console.log(err);
        }
      );
    });
};
