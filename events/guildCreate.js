const { defaultConfig, getConfig, updateConfig } = require('../config_manager');

module.exports = (bot, guild) => {
    let cfg = getConfig(guild);
    if(cfg == null) {
        updateConfig(guild, defaultConfig());
    }
};
