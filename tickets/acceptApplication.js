const {
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle
} = require("discord.js");

const config = require("../config");

module.exports = async (interaction) => {

    // Only moderators can accept
    if (!interaction.member.roles.cache.has(config.modRole)) {
        return interaction.reply({
            content: "❌ Only moderators can accept applications.",
            ephemeral: true
        });
    }

    // Prevent accepting your own application
    if (interaction.channel.topic === `Applicant:${interaction.user.id}`) {
        return interaction.reply({
            content: "❌ You can't accept your own application.",
            ephemeral: true
        });
    }

    // Disable Accept and Deny buttons
    const row = interaction.message.components[0];
    const newRow = new ActionRowBuilder();

    row.components.forEach(button => {

        if (
            button.data.custom_id === "accept_application" ||
            button.data.custom_id === "deny_application"
        ) {

            newRow.addComponents(
                ButtonBuilder.from(button)
                    .setDisabled(true)
            );

        } else {

            newRow.addComponents(ButtonBuilder.from(button));

        }

    });

    await interaction.update({
        components: [newRow]
    });

    await interaction.channel.send(
        `✅ **Application Accepted**\n\nAccepted by ${interaction.user}`
    );

    // Try to DM the applicant
    try {

        const applicantId = interaction.channel.topic.replace("Applicant:", "");
        const applicant = await interaction.client.users.fetch(applicantId);

        await applicant.send(
            `🎉 Your application in **${interaction.guild.name}** has been **accepted!**`
        );

    } catch (err) {
        console.log("Couldn't DM applicant.");
    }

    // Log the action
    const logChannel = interaction.guild.channels.cache.get(config.ticketLogs);

    if (logChannel) {
        await logChannel.send({
            content: `✅ **Application Accepted**

**Moderator:** ${interaction.user}
**Channel:** ${interaction.channel}`
        });
    }

};