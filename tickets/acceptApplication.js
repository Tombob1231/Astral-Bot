module.exports = async (interaction) => {

    await interaction.reply({
        content: `✅ ${interaction.user} accepted this application.`,
        ephemeral: false
    });

};