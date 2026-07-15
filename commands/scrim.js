const {
    SlashCommandBuilder,
    PermissionFlagsBits
} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("scrim")
        .setDescription("Manage Astral scrims.")
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)

        .addSubcommand(subcommand =>
            subcommand
                .setName("add")
                .setDescription("Add a new scrim.")
                .addStringOption(option =>
                    option
                        .setName("opponent")
                        .setDescription("Opponent name")
                        .setRequired(true))
                .addStringOption(option =>
                    option
                        .setName("date")
                        .setDescription("Scrim date")
                        .setRequired(true))
                .addStringOption(option =>
                    option
                        .setName("time")
                        .setDescription("Scrim time")
                        .setRequired(true))
                .addStringOption(option =>
                    option
                        .setName("tournament")
                        .setDescription("Tournament or event")
                        .setRequired(true))
                .addStringOption(option =>
                    option
                        .setName("stream")
                        .setDescription("Stream link or TBA")
                        .setRequired(true))
        ),

    async execute(interaction) {

        const subcommand = interaction.options.getSubcommand();

        if (subcommand === "add") {

            const opponent = interaction.options.getString("opponent");
            const date = interaction.options.getString("date");
            const time = interaction.options.getString("time");
            const tournament = interaction.options.getString("tournament");
            const stream = interaction.options.getString("stream");

            await interaction.reply({
                content:
`✅ Scrim received!

Opponent: ${opponent}
Date: ${date}
Time: ${time}
Tournament: ${tournament}
Stream: ${stream}`,
                ephemeral: true
            });

        }

    }
};