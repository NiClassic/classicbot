const { api_token } = require("../secret.json");
const { RichEmbed } = require("discord.js");
const fetch = require("node-fetch");

module.exports.name = "ytsearch";

module.exports.description = "Use it to search for a specific youtube video";

module.exports.permission = "ADMINISTRATOR";

module.exports.usage = "ytsearch 'search term'";

module.exports.run = async (bot, message, args) => {
  //base url for youtube v3 api
  const bUrl = "https://www.googleapis.com/youtube/v3/";
  //url search query
  const req = `search?part=snippet&q=${args.join(
    " "
  )}&type=video&key=${api_token}&maxResults=10`;
  //base url for video link
  const bVideoLink = "https://www.youtube.com/watch?v=";
  //make request to api
  let response = await fetch(bUrl + req);
  //get json body of response
  let results = await response.json();
  //items from the request
  let items = results["items"];
  let embed = new RichEmbed();
  embed.setTitle(`Search results for \`${args.join(" ")}\``);
  items.forEach(item => {
    embed.addField(
      //Add video title and video description + link to an embed
      item["snippet"]["channelTitle"],
      `[${item["snippet"]["title"]}](${bVideoLink}${item["id"]["videoId"]})`
    );
  });
  return message.channel.send(embed);
};

module.exports.matchArgLength = function(argcount) {
  return argcount > 0;
};
