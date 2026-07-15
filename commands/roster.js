const {
    SlashCommandBuilder,
    EmbedBuilder
} = require("discord.js");

console.log("LOADED ROSTER.JS - VERSION 2");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("roster")
        .setDescription("Displays the Astral Rocket League roster."),

    async execute(interaction) {

        const embed = new EmbedBuilder()
            .setColor("#8A2BE2")
            .setImage("https://cdn.discordapp.com/attachments/1526902981516333186/1526914184489472190/Astral_Roster.png?ex=6a58c126&is=6a576fa6&hm=77db93beb7239f023f795fa42990503959abe56b41dc8af40c8e8b26cf5bd90c&")
  .addFields(
    {
        name: "<:SSL:1526912212936036382> SSL",
        value: "👑 Player 1\n👑 Player 2"
    },
    {
        name: "<:GC2:1526913140829192244> <:GC3:1526912403407896588> GC2 - GC3",
        value: "👤 Player 1\n👤 Player 2\n👤 Player 3"
    },
    {
        name: "<:C3:1526912529803251722> <:GC1:1526913207053062145> C3 - GC1",
        value: "👤 Player 1\n👤 Player 2\n👤 Player 3"
    },
    {
        name: "<:C1:1526912879335440495> <:C2:1526912991940051135> C1 - C2",
        value: "👤 Player 1\n👤 Player 2\n👤 Player 3"
    }
)
            .setFooter({
                text: "⭐ Together We Rise ⭐"
            })
            .setTimestamp();

        await interaction.reply({
            embeds: [embed]
        });

    }
};