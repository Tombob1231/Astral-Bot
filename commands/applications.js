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
        .setCustomId("apply_coach")
        .setLabel("Coach Application")
        .setEmoji("🏆")
        .setStyle(ButtonStyle.Success),
   
        new ButtonBuilder()
        .setCustomId("apply_team")
        .setLabel("Team Application")
        .setEmoji("🎮")
        .setStyle(ButtonStyle.Primary),

        new ButtonBuilder()
        .setCustomId("apply_mod")
        .setLabel("Moderator Application")
        .setEmoji("🛡️")
        .setStyle(ButtonStyle.Secondary),

           new ButtonBuilder()
        .setCustomId("apply_team")
        .setLabel("Team Application")
        .setEmoji("🎮")
        .setStyle(ButtonStyle.Primary),

    new ButtonBuilder()
        .setCustomId("request_coaching")
.setLabel("Request Coaching")
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