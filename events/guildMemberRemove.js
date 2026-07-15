const config = require("../config");

module.exports = {
    name: "guildMemberRemove",

    async execute(member) {

        const memberCountChannel = member.guild.channels.cache.get(config.memberCountChannel);

        if (!memberCountChannel) return;

        await memberCountChannel
            .setName(`👥 Members: ${member.guild.memberCount}`)
            .catch(console.error);

    }
};