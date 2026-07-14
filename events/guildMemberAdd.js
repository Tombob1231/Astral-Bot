module.exports = {
    name: 'guildMemberAdd',

    async execute(member) {

        // Change this to your welcome channel ID
        const welcomeChannel = member.guild.channels.cache.get('1526675634351505658');

        // Change this to your Member role ID
        const memberRole = member.guild.roles.cache.get('1526256428719935628');

        // Give the member role
        if (memberRole) {
            await member.roles.add(memberRole);
        }

        // Send welcome message
        if (welcomeChannel) {
            welcomeChannel.send(`🎉 Welcome ${member}, and we’re happy to have you here!

Here are a few things to get you started:

💬 General Chat: Head over to the general channel to introduce yourself and chat with everyone. <#1526675643180257331>

📝 Apply Here: When you’re ready to join our teams, submit your application here: <#1526679515110182962>

Feel free to ask questions, get involved, and enjoy being part of the community. Welcome again! 😊`
            );
        }
    },
};