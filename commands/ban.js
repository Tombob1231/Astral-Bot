const {
    SlashCommandBuilder,
    PermissionFlagsBits
} = require("discord.js");

const config = require("../config");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ban")
        .setDescription("Ban a member from the server.")
        .addUserOption(option =>
            option
                .setName("user")
                .setDescription("The member to ban")
                .setRequired(true)
        )
        .addStringOption(option =>
            option
                .setName("reason")
                .setDescription("Reason for the ban")
                .setRequired(true)
        ),

    async execute(interaction) {

        if (!interaction.member.roles.cache.has(config.modRole)) {
            return interaction.reply({
                content: "❌ You don't have permission to use this command.",
                ephemeral: true
            });
        }

        const member = interaction.options.getMember("user");
        const user = interaction.options.getUser("user");
        const reason = interaction.options.getString("reason");

        if (!member) {
            return interaction.reply({
                content: "❌ Member not found.",
                ephemeral: true
            });
        }

        if (member.permissions.has(PermissionFlagsBits.Administrator)) {
            return interaction.reply({
                content: "❌ You can't ban an administrator.",
                ephemeral: true
            });
        }

        if (!member.bannable) {
            return interaction.reply({
                content: "❌ I can't ban that member. They may have a higher role than me.",
                ephemeral: true
            });
        }

        try {
            await user.send(
                `🔨 You have been banned from **${interaction.guild.name}**.\n\nReason: **${reason}**`
            );
        } catch {}

        await member.ban({ reason });

        await interaction.reply({
            content: `🔨 **${user.tag}** has been banned.\n**Reason:** ${reason}`
        });

        const logChannel = interaction.guild.channels.cache.get(config.ticketLogs);

        if (logChannel) {
            await logChannel.send({
                content: `🔨 **Member Banned**

**Moderator:** ${interaction.user}
**Member:** ${user.tag}
**Reason:** ${reason}`
            });
        }
    }
};