const { Events } = require("discord.js");
const startTikTokChecker = require("../jobs/tiktokChecker");

module.exports = {
    name: Events.ClientReady,
    once: true,
    execute(client) {
        console.log(`${client.user.tag} is online!`);

        startTikTokChecker(client);
    },
};