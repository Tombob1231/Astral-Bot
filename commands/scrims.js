const {
    SlashCommandBuilder,
    EmbedBuilder
} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("scrims")
        .setDescription("Displays Astral's upcoming scrims."),

    async execute(interaction) {

        const embed = new EmbedBuilder()
            .setColor("#8A2BE2")
            .setImage("https://cdn.discordapp.com/attachments/1526902981516333186/1526951013041569973/Scrims.png?ex=6a58e372&is=6a5791f2&hm=fd7e6ac085588a6e4a6aea6d1d13d55b78de2738da54afc6069fd759e9bd5515&")
            .setDescription(`
# 🗓 Upcoming Scrims

━━━━━━━━━━━━━━━━━━━━━━

⚔️ **Astral vs Team Nova**

📅 Friday, 18 July
🕖 7:00 PM BST
🏆 Community League
📺 [Watch Live](📺 Stream: TBA)

━━━━━━━━━━━━━━━━━━━━━━

⚔️ **Astral vs Eclipse**

📅 Sunday, 20 July
🕗 8:00 PM BST
🏆 Weekly Scrim
📺 [Watch Live](📺 Stream: TBA)

━━━━━━━━━━━━━━━━━━━━━━

⚔️ **Astral vs Velocity**

📅 Tuesday, 22 July
🕗 8:30 PM BST
🏆 RLCS Open
📺 [Watch Live](📺 Stream: TBA)

━━━━━━━━━━━━━━━━━━━━━━
`)
            .setFooter({
                text: "⭐ Together We Rise ⭐"
            })
            .setTimestamp();

        await interaction.reply({
            embeds: [embed]
        });

    }
};