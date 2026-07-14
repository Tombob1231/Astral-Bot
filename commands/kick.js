const {
    SlashCommandBuilder,
    PermissionFlagsBits
} = require("discord.js");

const config = require("../config");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("kick")
        .setDescription("Kick a member from the server.")
        .addUserOption(option =>
            option
                .setName("user")
                .setDescription("The member to kick")
                .setRequired(true)
        )
        .addStringOption(option =>
            option
                .setName("reason")
                .setDescription("Reason for the kick")
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
        const reason = interaction.options.getString("reason");

        if (!member) {
            return interaction.reply({
                content: "❌ Member not found.",
                ephemeral: true
            });
        }

        // Prevent kicking administrators
        if (member.permissions.has(PermissionFlagsBits.Administrator)) {
            return interaction.reply({
                content: "❌ You can't kick an administrator.",
                ephemeral: true
            });
        }

        // Check if the bot can kick them
        if (!member.kickable) {
            return interaction.reply({
                content: "❌ I can't kick that member. They may have a higher role than me.",
                ephemeral: true
            });
        }

        // Try to DM before kicking
        try {
            await member.send(
                `👢 You have been kicked from **${interaction.guild.name}**.\n\nReason: **${reason}**`
            );
        } catch (err) {
            console.log("Couldn't DM user.");
        }

        await member.kick(reason);

        await interaction.reply({
            content: `👢 ${member.user.tag} has been kicked.\n**Reason:** ${reason}`
        });

        // Log the action
        const logChannel = interaction.guild.channels.cache.get(config.ticketLogs);

        if (logChannel) {
            await logChannel.send({
                content: `👢 **Member Kicked**

**Moderator:** ${interaction.user}
**Member:** ${member.user.tag}
**Reason:** ${reason}`
            });
        }

    }
};