const {
    ChannelType,
    PermissionFlagsBits,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle
} = require("discord.js");

module.exports = async (interaction) => {

    const channel = await interaction.guild.channels.create({
    name: `coaching-${interaction.user.username}`,
    type: ChannelType.GuildText,
    parent: "1527706872398745813",

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
const row = new ActionRowBuilder().addComponents(
    new ButtonBuilder()
        .setCustomId("close_coaching_ticket")
        .setLabel("🔒 Close Ticket")
        .setStyle(ButtonStyle.Danger)
);
await channel.send({
    content: `<@&1502684947993989253> <@&1501306073607307334>

🎓 **Coaching Request**

Welcome ${interaction.user}!

Please answer the following:

• What rank are you?
• What mode do you play?
• What do you want help improving?
• How often can you practice?

A coach will respond as soon as possible.`,
    components: [row]
});
};