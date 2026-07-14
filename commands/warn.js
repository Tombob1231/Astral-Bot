const {
    SlashCommandBuilder
} = require("discord.js");

const config = require("../config");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("warn")
        .setDescription("Warn a member.")
        .addUserOption(option =>
            option
                .setName("user")
                .setDescription("The user to warn")
                .setRequired(true)
        )
        .addStringOption(option =>
            option
                .setName("reason")
                .setDescription("Reason for the warning")
                .setRequired(true)
        ),

    async execute(interaction) {

        // Moderator role check
        if (!interaction.member.roles.cache.has(config.modRole)) {
            return interaction.reply({
                content: "❌ You don't have permission to use this command.",
                ephemeral: true
            });
        }

        const user = interaction.options.getUser("user");
        const member = interaction.guild.members.cache.get(user.id);
        const reason = interaction.options.getString("reason");

        if (!member) {
            return interaction.reply({
                content: "❌ That member isn't in this server.",
                ephemeral: true
            });
        }

        // Reply in the server
        await interaction.reply({
            content: `⚠️ ${user} has been warned.\n**Reason:** ${reason}`
        });

        // Try to DM the user
        try {
            await user.send(
                `⚠️ You have been warned in **${interaction.guild.name}**.\n\nReason: **${reason}**`
            );
        } catch (err) {
            console.log("Couldn't DM user.");
        }

        // Send to logs
        const logChannel = interaction.guild.channels.cache.get(config.ticketLogs);

        if (logChannel) {
            await logChannel.send({
                content: `⚠️ **Member Warned**

**Moderator:** ${interaction.user}
**Member:** ${user}
**Reason:** ${reason}`
            });
        }

    }
};