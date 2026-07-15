const { EmbedBuilder } = require("discord.js");
const config = require("../config");

module.exports = {
    name: "guildMemberAdd",

    async execute(member) {

        // Welcome channel

        // Welcome channel
        const welcomeChannel = member.guild.channels.cache.get("1526675634351505658");

        // Member role
        const memberRole = member.guild.roles.cache.get("1526256428719935628");

        // Give member role
        if (memberRole) {
            await member.roles.add(memberRole).catch(console.error);
        }
// Update member count channel
const memberCountChannel = member.guild.channels.cache.get(config.memberCountChannel);

if (memberCountChannel) {
    await memberCountChannel
        .setName(`👥 Members: ${member.guild.memberCount}`)
        .catch(console.error);
}
        if (!welcomeChannel) return;

        const welcomeEmbed = new EmbedBuilder()
            .setColor("#8A2BE2")
            .setTitle("🌌 Welcome to Astral!")
            .setDescription(
`Welcome ${member}!

⭐ **Together We Rise** ⭐

We're excited to have you join the Astral community!

## 🚀 Get Started

💬 **General Chat**
Head over to <#1526675643180257331> and introduce yourself.

📝 **Applications**
Interested in joining one of our teams? Apply in <#1526679515110182962>.

🎫 **Need Help?**
Open a support ticket and one of our staff members will assist you. <#1526675650747039755>

Have fun, make new friends, and enjoy your stay with Astral! 💜`
            )
            .setImage("https://cdn.discordapp.com/attachments/1526902981516333186/1526904702602707074/Welcome_To_astral.png?ex=6a58b851&is=6a5766d1&hm=a95e2f7d2460076f22e4b871e7ddc316e4a3c1d6b1ccd6c32ce2242fa9564055&")
            .setFooter({
                text: `Member #${member.guild.memberCount} • Together We Rise`
            })
            .setTimestamp();

        await welcomeChannel.send({
            content: `🎉 Welcome ${member}!`,
            embeds: [welcomeEmbed]
        });

    },
};