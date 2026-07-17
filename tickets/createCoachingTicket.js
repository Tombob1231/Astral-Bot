const {
    ChannelType,
    PermissionFlagsBits
} = require("discord.js");

module.exports = async (interaction) => {

    const channel = await interaction.guild.channels.create({
        name: `coaching-${interaction.user.username}`,
        type: ChannelType.GuildText,

        permissionOverwrites: [
            {
                id: interaction.guild.id,
                deny: [PermissionFlagsBits.ViewChannel]
            },
            {
                id: interaction.user.id,
                allow: [
                    PermissionFlagsBits.ViewChannel,
                    PermissionFlagsBits.SendMessages
                ]
            }
        ]
    });

    await channel.send({
        content:
`🎓 **Coaching Request**

Welcome ${interaction.user}!

Please answer the following:

• What rank are you?
• What mode do you play?
• What do you want help improving?
• How often can you practice?

A coach will respond as soon as possible.`
    });

    await interaction.reply({
        content: `✅ Your coaching request has been created: ${channel}`,
        ephemeral: true
    });

};