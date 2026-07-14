const {
    SlashCommandBuilder,
    PermissionFlagsBits
} = require("discord.js");

const config = require("../config");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("untimeout")
        .setDescription("Remove a timeout from a member.")
        .addUserOption(option =>
            option
                .setName("user")
                .setDescription("The member to remove the timeout from")
                .setRequired(true)
        )
        .addStringOption(option =>
            option
                .setName("reason")
                .setDescription("Reason for removing the timeout")
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

        const member = interaction.options.getMember("user");
        const reason = interaction.options.getString("reason") || "No reason provided.";

        if (!member) {
            return interaction.reply({
                content: "❌ Member not found.",
                ephemeral: true
            });
        }

        await member.timeout(null);

        await interaction.reply({
            content: `✅ ${member} has been removed from timeout.\n**Reason:** ${reason}`
        });

        // Try to DM the member
        try {
            await member.send(
                `✅ Your timeout has been removed in **${interaction.guild.name}**.\n\nReason: **${reason}**`
            );
        } catch (err) {
            console.log("Couldn't DM user.");
        }

        // Log the action
        const logChannel = interaction.guild.channels.cache.get(config.ticketLogs);

        if (logChannel) {
            await logChannel.send({
                content: `✅ **Timeout Removed**

**Moderator:** ${interaction.user}
**Member:** ${member}
**Reason:** ${reason}`
            });
        }

    }
};