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
            .setImage("YOUR_SCRIMS_BANNER_LINK")
            .setDescription(`
# 🗓 Upcoming Scrims

━━━━━━━━━━━━━━━━━━━━━━

⚔️ **Astral vs Team Nova**

📅 Friday, 18 July
🕖 7:00 PM BST
🏆 Community League

━━━━━━━━━━━━━━━━━━━━━━

⚔️ **Astral vs Eclipse**

📅 Sunday, 20 July
🕗 8:00 PM BST
🏆 Weekly Scrim

━━━━━━━━━━━━━━━━━━━━━━

⚔️ **Astral vs Velocity**

📅 Tuesday, 22 July
🕗 8:30 PM BST
🏆 RLCS Open

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