module.exports = async (interaction) => {

    await interaction.reply({
        content: `❌ ${interaction.user} denied this application.`,
        ephemeral: false
    });

};