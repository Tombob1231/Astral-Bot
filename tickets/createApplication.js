const {
    ChannelType,
    PermissionFlagsBits,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle
} = require("discord.js");

const config = require("../config");

module.exports = async (interaction, type) => {
    try {

        let channelName;
        let title;
        let questions;

        switch (type) {

            case "coach":
                channelName = `coach-${interaction.user.username}`;
                title = "🏆 Coach Application";
                questions = `1️⃣ How old are you?

2️⃣ What games do you coach?

3️⃣ How much coaching experience do you have?

4️⃣ Why do you want to coach for Astral?

5️⃣ How active can you be every week?`;
                break;

            case "mod":
                channelName = `mod-${interaction.user.username}`;
                title = "🛡️ Moderator Application";
                questions = `1️⃣ How old are you?

2️⃣ What is your timezone?

3️⃣ Have you moderated before?

4️⃣ Why should we choose you?

5️⃣ How active are you?`;
                break;

            case "team":
                channelName = `team-${interaction.user.username}`;
                title = "🎮 Team Application";
                questions = 
`1️⃣What is your current/Peak rank?

2️⃣ What is your availibility?

3️⃣ What Kind of playstlye do you have?

4️⃣ What region Do you play in?

5️⃣ Why do you want to join Astral?`;
                break;

            default:
                return interaction.reply({
                    content: "❌ Unknown application type.",
                    ephemeral: true
                });
        }

        const buttons = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setCustomId("claim_ticket")
                .setLabel("👤 Claim")
                .setStyle(ButtonStyle.Primary),

            new ButtonBuilder()
                .setCustomId("accept_application")
                .setLabel("✅ Accept")
                .setStyle(ButtonStyle.Success),

            new ButtonBuilder()
                .setCustomId("deny_application")
                .setLabel("❌ Deny")
                .setStyle(ButtonStyle.Danger),

            new ButtonBuilder()
                .setCustomId("close_ticket")
                .setLabel("🔒 Close")
                .setStyle(ButtonStyle.Secondary),

            new ButtonBuilder()
                .setCustomId("delete_ticket")
                .setLabel("🗑 Delete")
                .setStyle(ButtonStyle.Secondary)
        );

        const channel = await interaction.guild.channels.create({
    name: channelName,
    type: ChannelType.GuildText,
    parent: config.applicationsCategory,

    // Store the applicant's ID
    topic: `Applicant:${interaction.user.id}`,

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
            content: `# ${title}

Welcome ${interaction.user}! 👋

Please answer the following questions below.

${questions}`,
            components: [buttons]
        });

        await interaction.reply({
            content: `✅ Your application has been created: ${channel}`,
            ephemeral: true
        });

    } catch (err) {
        console.error(err);

        if (!interaction.replied && !interaction.deferred) {
            await interaction.reply({
                content: "❌ Error creating application.",
                ephemeral: true
            });
        }
    }
};