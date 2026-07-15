const {
    SlashCommandBuilder
} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("roster")
        .setDescription("Post the Astral Rocket League roster."),

    async execute(interaction) {

        await interaction.reply({
            content: "✅ Roster command is working!",
            ephemeral: true
        });

    }
};