const {
    SlashCommandBuilder,
    PermissionFlagsBits,
    EmbedBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle
} = require("discord.js");

const roles = require("../config/roles");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("roles")
        .setDescription("Post the self-role panel.")
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

    async execute(interaction) {

        // =========================
        // Notifications
        // =========================

        const notificationsEmbed = new EmbedBuilder()
            .setColor("#00B0F4")
            .setTitle("🔔 Notification Roles")
            .setDescription(
                "Choose which notifications you'd like to receive.\n\nClick again to remove a role."
            );

        const notificationRow = new ActionRowBuilder().addComponents(

            new ButtonBuilder()
                .setCustomId(roles.notifications.announcements.customId)
                .setLabel(roles.notifications.announcements.label)
                .setEmoji(roles.notifications.announcements.emoji)
                .setStyle(ButtonStyle.Primary),

            new ButtonBuilder()
                .setCustomId(roles.notifications.socials.customId)
                .setLabel(roles.notifications.socials.label)
                .setEmoji(roles.notifications.socials.emoji)
                .setStyle(ButtonStyle.Primary)

        );

        // =========================
        // Rocket League
        // =========================

        const rlEmbed = new EmbedBuilder()
            .setColor("#00B0F4")
            .setTitle("🚀 Rocket League Ranks")
            .setDescription(
                "Select your **current Rocket League rank**.\n\nYou can only have **ONE** Rocket League rank at a time."
            );

        const rlRows = [];

        for (let i = 0; i < roles.rocketLeague.length; i += 5) {

            const row = new ActionRowBuilder();

            for (const rank of roles.rocketLeague.slice(i, i + 5)) {

                row.addComponents(

                    new ButtonBuilder()
                        .setCustomId(rank.customId)
                        .setLabel(rank.label)
                        .setEmoji(rank.emoji)
                        .setStyle(ButtonStyle.Secondary)

                );

            }

            rlRows.push(row);

        }

        // =========================
        // Community
        // =========================

        const communityEmbed = new EmbedBuilder()
            .setColor("#00B0F4")
            .setTitle("🤝 Community Roles")
            .setDescription(
                "Tell other members what you're looking for."
            );

        const communityRow = new ActionRowBuilder().addComponents(

            new ButtonBuilder()
                .setCustomId(roles.community.lft.customId)
                .setLabel(roles.community.lft.label)
                .setEmoji(roles.community.lft.emoji)
                .setStyle(ButtonStyle.Success),

            new ButtonBuilder()
                .setCustomId(roles.community.lfp.customId)
                .setLabel(roles.community.lfp.label)
                .setEmoji(roles.community.lfp.emoji)
                .setStyle(ButtonStyle.Success)

        );

        // =========================
        // Send Messages
        // =========================

        await interaction.channel.send({
            embeds: [notificationsEmbed],
            components: [notificationRow]
        });

        await interaction.channel.send({
            embeds: [rlEmbed],
            components: rlRows
        });

        await interaction.channel.send({
            embeds: [communityEmbed],
            components: [communityRow]
        });

        await interaction.reply({
            content: "✅ Role panel posted successfully!",
            ephemeral: true
        });

    }
};