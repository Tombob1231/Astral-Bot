const {
    SlashCommandBuilder,
    PermissionFlagsBits
} = require("discord.js");

const config = require("../config");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("clear")
        .setDescription("Delete multiple messages.")
        .addIntegerOption(option =>
            option
                .setName("amount")
                .setDescription("Number of messages to delete (1-100)")
                .setRequired(true)
        ),

    async execute(interaction) {

        // Check Moderator Role
        if (!interaction.member.roles.cache.has(config.modRole)) {
            return interaction.reply({
                content: "❌ You don't have permission to use this command.",
                ephemeral: true
            });
        }

        const amount = interaction.options.getInteger("amount");

        if (amount < 1 || amount > 100) {
            return interaction.reply({
                content: "❌ Choose a number between 1 and 100.",
                ephemeral: true
            });
        }

        await interaction.channel.bulkDelete(amount, true);

        await interaction.reply({
            content: `🧹 Deleted **${amount}** messages.`,
            ephemeral: true
        });

    }
};