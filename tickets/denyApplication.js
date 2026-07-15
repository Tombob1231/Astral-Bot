const config = require("../config");

module.exports = async (interaction) => {

    if (!interaction.member.roles.cache.has(config.modRole)) {
    return interaction.reply({
        content: "❌ Only moderators can accept or deny applications.",
        ephemeral: true
    });
}

    await interaction.reply({
        content: `❌ ${interaction.user} denied this application.`,
        ephemeral: false
    });

};