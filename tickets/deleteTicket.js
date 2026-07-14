
const { createTranscript } = require("discord-html-transcripts");
const config = require("../config");

module.exports = async (interaction) => {
    try {

        await interaction.reply({
            content: "📄 Creating transcript...",
            ephemeral: true
        });
const ticketName = interaction.channel.name;

        const transcript = await createTranscript(interaction.channel, {
            filename: '**Ticket:** ${ticketName}'
        });

        const logChannel = interaction.guild.channels.cache.get(config.ticketLogs);

        if (logChannel) {
            await logChannel.send({
                content: `🗑 **Ticket Deleted**

**Deleted by:** ${interaction.user}
**Ticket:** ${interaction.channel}`,
                files: [transcript]
            });
        }

        await interaction.channel.delete();

    } catch (err) {
        console.error(err);

        if (!interaction.replied) {
            await interaction.reply({
                content: "❌ Failed to create transcript.",
                ephemeral: true
            });
        }
    }
};