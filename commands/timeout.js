const {
    SlashCommandBuilder,
    PermissionFlagsBits
} = require("discord.js");

const config = require("../config");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("timeout")
        .setDescription("Timeout a member.")
        .addUserOption(option =>
            option
                .setName("user")
                .setDescription("The member to timeout")
                .setRequired(true)
        )
        .addIntegerOption(option =>
            option
                .setName("minutes")
                .setDescription("How many minutes?")
                .setRequired(true)
                .setMinValue(1)
                .setMaxValue(40320) // 28 days
        )
        .addStringOption(option =>
            option
                .setName("reason")
                .setDescription("Reason for the timeout")
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

        const member = interaction.options.getMember("user");
        const minutes = interaction.options.getInteger("minutes");
        const reason = interaction.options.getString("reason");

        if (!member) {
            return interaction.reply({
                content: "❌ Member not found.",
                ephemeral: true
            });
        }

        // Don't timeout administrators
        if (member.permissions.has(PermissionFlagsBits.Administrator)) {
            return interaction.reply({
                content: "❌ You can't timeout an administrator.",
                ephemeral: true
            });
        }

        await member.timeout(minutes * 60 * 1000, reason);

        await interaction.reply({
            content: `⏱️ ${member} has been timed out for **${minutes} minute(s)**.\n**Reason:** ${reason}`
        });

        // DM the user
        try {
            await member.send(
                `⏱️ You have been timed out in **${interaction.guild.name}**.\n\nDuration: **${minutes} minute(s)**\nReason: **${reason}**`
            );
        } catch (err) {
            console.log("Couldn't DM user.");
        }

        // Log the action
        const logChannel = interaction.guild.channels.cache.get(config.ticketLogs);

        if (logChannel) {
            await logChannel.send({
                content: `⏱️ **Member Timed Out**

**Moderator:** ${interaction.user}
**Member:** ${member}
**Duration:** ${minutes} minute(s)
**Reason:** ${reason}`
            });
        }

    }
};