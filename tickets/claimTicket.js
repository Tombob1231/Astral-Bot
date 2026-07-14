const {
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle
} = require("discord.js");

const config = require("../config");

module.exports = async (interaction) => {

    const row = interaction.message.components[0];
    const newRow = new ActionRowBuilder();

    row.components.forEach(button => {

        if (button.data.custom_id === "claim_ticket") {

            newRow.addComponents(
                ButtonBuilder.from(button)
                    .setLabel(`Claimed by ${interaction.user.username}`)
                    .setDisabled(true)
                    .setStyle(ButtonStyle.Success)
            );

        } else {

            newRow.addComponents(ButtonBuilder.from(button));

        }

    });

    await interaction.update({
        components: [newRow]
    });

    await interaction.channel.send(
        `👤 ${interaction.user} has claimed this ticket.`
    );

    const logChannel = interaction.guild.channels.cache.get(config.ticketLogs);

    if (logChannel) {
        await logChannel.send(
            `👤 **Ticket Claimed**

**Moderator:** ${interaction.user}
**Ticket:** ${interaction.channel}`
        );
    }

};