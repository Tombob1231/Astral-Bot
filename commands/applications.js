const {
    SlashCommandBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle
} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("applications")
        .setDescription("Send the Astral application panel"),

    async execute(interaction) {

    const row = new ActionRowBuilder().addComponents(
    new ButtonBuilder()
        .setCustomId("apply_team")
        .setLabel("Team Application")
        .setStyle(ButtonStyle.Primary),

    new ButtonBuilder()
        .setCustomId("apply_coach")
        .setLabel("Coach Application")
        .setStyle(ButtonStyle.Success),

    new ButtonBuilder()
        .setCustomId("apply_mod")
        .setLabel("Moderator Application")
        .setStyle(ButtonStyle.Secondary),

    new ButtonBuilder()
        .setCustomId("ask_coaching")
        .setLabel("Ask for Coaching")
        .setEmoji("🎓")
        .setStyle(ButtonStyle.Danger)
);

        await interaction.reply({
            content:
`# 🌌 Astral Organisation Applications

Choose which application you'd like to submit.

🏆 Coach

🛡️ Moderator

🎮 Team

Click one of the buttons below.`,
            components: [row]
        });

    }
};