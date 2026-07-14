const {
    SlashCommandBuilder
} = require("discord.js");

const config = require("../config");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("unban")
        .setDescription("Unban a user from the server.")
        .addStringOption(option =>
            option
                .setName("userid")
                .setDescription("The ID of the user to unban")
                .setRequired(true)
        )
        .addStringOption(option =>
            option
                .setName("reason")
                .setDescription("Reason for the unban")
                .setRequired(false)
        ),

    async execute(interaction) {

        // Moderator role check
        if (!interaction.member.roles.cache.has(config.modRole)) {
            return interaction.reply({
                content: "❌ You don't have permission to use this command.",
                ephemeral: true
            });
        }

        const userId = interaction.options.getString("userid");
        const reason = interaction.options.getString("reason") || "No reason provided.";

        try {

            const user = await interaction.client.users.fetch(userId);

            await interaction.guild.members.unban(userId, reason);

            await interaction.reply({
                content: `✅ **${user.tag}** has been unbanned.\n**Reason:** ${reason}`
            });

            // Try to DM the user
            try {
                await user.send(
                    `✅ You have been unbanned from **${interaction.guild.name}**.\n\nReason: **${reason}**`
                );
            } catch (err) {
                console.log("Couldn't DM user.");
            }

            // Log the action
            const logChannel = interaction.guild.channels.cache.get(config.ticketLogs);

            if (logChannel) {
                await logChannel.send({
                    content: `✅ **Member Unbanned**

**Moderator:** ${interaction.user}
**Member:** ${user.tag}
**Reason:** ${reason}`
                });
            }

        } catch (err) {

            await interaction.reply({
                content: "❌ That user isn't banned or the ID is invalid.",
                ephemeral: true
            });

        }

    }
};