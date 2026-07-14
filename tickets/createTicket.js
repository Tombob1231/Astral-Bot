const {
    ChannelType,
    PermissionFlagsBits,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle
} = require("discord.js");

const config = require("../config");

module.exports = async (interaction) => {
    try {

        const buttons = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setCustomId("claim_ticket")
                .setLabel("👤 Claim")
                .setStyle(ButtonStyle.Primary),

            new ButtonBuilder()
                .setCustomId("close_ticket")
                .setLabel("🔒 Close")
                .setStyle(ButtonStyle.Danger),

            new ButtonBuilder()
                .setCustomId("delete_ticket")
                .setLabel("🗑 Delete")
                .setStyle(ButtonStyle.Secondary)
        );

        const channel = await interaction.guild.channels.create({
            name: `ticket-${interaction.user.username}`,
            type: ChannelType.GuildText,
            parent: config.ticketCategory,

            permissionOverwrites: [
                {
                    id: interaction.guild.id,
                    deny: [PermissionFlagsBits.ViewChannel]
                },
                {
                    id: interaction.user.id,
                    allow: [
                        PermissionFlagsBits.ViewChannel,
                        PermissionFlagsBits.SendMessages,
                        PermissionFlagsBits.ReadMessageHistory
                    ]
                },
                {
                    id: config.modRole,
                    allow: [
                        PermissionFlagsBits.ViewChannel,
                        PermissionFlagsBits.SendMessages,
                        PermissionFlagsBits.ReadMessageHistory
                    ]
                }
            ]
        });

        await channel.send({
            content: `# 🎫 Welcome ${interaction.user}

Thanks for opening a support ticket!

A member of the <@&${config.modRole}> team will be with you shortly.`,
            components: [buttons]
        });

        await interaction.reply({
            content: `✅ Ticket created: ${channel}`,
            ephemeral: true
        });

        const logChannel = interaction.guild.channels.cache.get(config.ticketLogs);

        if (logChannel) {
            await logChannel.send({
                content: `🎫 **Support Ticket Opened**

**User:** ${interaction.user}
**Ticket:** ${channel}`
            });
        }

    } catch (err) {

        console.error(err);

        if (!interaction.replied) {
            await interaction.reply({
                content: "❌ There was an error creating the ticket.",
                ephemeral: true
            });
        }

    }

};