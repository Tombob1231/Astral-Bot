const {
    SlashCommandBuilder,
    EmbedBuilder
} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("results")
        .setDescription("Displays Astral's recent match results."),

    async execute(interaction) {

        const embed = new EmbedBuilder()
            .setColor("#8A2BE2")
            .setImage("https://cdn.discordapp.com/attachments/1526902981516333186/1526952428040224768/ChatGPT_Image_Jul_15_2026_03_02_21_PM.png?ex=6a58e4c4&is=6a579344&hm=86647ff4b708d1756e3c16b11559a13ca5f59dbee7a27579613b4f4f8843b29f&")
            .setDescription(`
# 🏆 Recent Results

━━━━━━━━━━━━━━━━━━━━━━

✅ **Astral 4 - 2 Team Nova**

🏆 Community League
📅 18 July 2025

━━━━━━━━━━━━━━━━━━━━━━

❌ **Astral 2 - 3 Eclipse**

🏆 RLCS Open Qualifier
📅 15 July 2025

━━━━━━━━━━━━━━━━━━━━━━

✅ **Astral 3 - 1 Velocity**

🏆 Weekly Scrim
📅 12 July 2025

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