const { join } = require("path");
const { readFileSync, writeFileSync } = require("fs");

module.exports.getConfig = guild => {
  let cfg = JSON.parse(
    readFileSync(join(process.cwd(), "config.json")),
    null,
    4
  );
  if (!cfg[guild.id]) {
    return null;
  }
  return cfg[guild.id];
};

module.exports.getPrefix = guild => {
  let cfg = this.getConfig(guild);
  if (!cfg["prefix"]) return null;
  return cfg["prefix"];
};

module.exports.updateConfig = (guild, config) => {
  let cfg = JSON.parse(
    readFileSync(join(process.cwd(), "config.json")),
    null,
    4
  );
  cfg[guild.id] = config;
  writeFileSync(
    join(process.cwd(), "config.json"),
    JSON.stringify(cfg, null, 4)
  );
};

module.exports.getGuildColor = guild => {
  let cfg = this.getConfig(guild);
  if (cfg != null) {
    return cfg["guildColor"];
  }
  //default value
  return "#0be02f";
};

//todo: write event when bot joins a new guild and add a default config for that guild.
//todo: embes should change their color according to config