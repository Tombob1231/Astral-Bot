const config = require("../config");

const {
    SlashCommandBuilder,
    EmbedBuilder
} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("roster")
        .setDescription("Displays the Astral Rocket League roster."),

    async execute(interaction) {

        const embed = new EmbedBuilder()
            .setColor("#8A2BE2")
            .setImage("https://cdn.discordapp.com/attachments/1526902981516333186/1526914184489472190/Astral_Roster.png?ex=6a58c126&is=6a576fa6&hm=77db93beb7239f023f795fa42990503959abe56b41dc8af40c8e8b26cf5bd90c&")

            .setDescription(`
## <:ssl:1526912212936036382> **SSL**

👑 Player 1
👑 Player 2

━━━━━━━━━━━━━━━━━━━━━━

## <:gc2:1526913140829192244> <:gc3:1526912403407896588> **GC2 - GC3**

👤 Player 1
👤 Player 2
👤 Player 3

━━━━━━━━━━━━━━━━━━━━━━

## <:c3:1526912529803251722> <:gc1:1526913207053062145> **C3 - GC1**

👤 Player 1
👤 Player 2
👤 Player 3

━━━━━━━━━━━━━━━━━━━━━━

## <:c1:1526912879335440495> <:c2:1526912991940051135> **C1 - C2**

👤 Player 1
👤 Player 2
👤 Player 3
`)
            .setFooter({
                text: "⭐ Together We Rise ⭐"
            })
            .setTimestamp();

     const channel = interaction.guild.channels.cache.get(config.rosterChannel);

if (!channel) {
    return interaction.reply({
        content: "❌ Roster channel not found.",
        ephemeral: true
    });
}

await channel.send({
    embeds: [embed]
});

await interaction.reply({
    content: "✅ Rocket League roster has been posted.",
    ephemeral: true
});

    }

};