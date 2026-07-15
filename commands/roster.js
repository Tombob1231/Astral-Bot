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
    name: "<:SSL:1526924642780971089> SSL",
    value:
`👑 **Player 1**
🔗 [Rocket League Tracker](https://rocketleague.tracker.network/rocket-league/profile/epic/PLAYER1/overview)

👑 **Player 2**
🔗 [Rocket League Tracker](https://rocketleague.tracker.network/rocket-league/profile/epic/PLAYER2/overview)

👑 **Player 3**
🔗 [Rocket League Tracker](https://rocketleague.tracker.network/rocket-league/profile/epic/PLAYER3/overview)`
},
    {
        name: "<:GC2:1526924992686719047> <:GC3:1526924973862555708> GC2 - GC3",
        value:
`👤 **Player 1**
🔗 [Rocket League Tracker](https://rocketleague.tracker.network/rocket-league/profile/epic/PLAYER1/overview)

👤 **Player 2**
🔗 [Rocket League Tracker](https://rocketleague.tracker.network/rocket-league/profile/epic/PLAYER2/overview)

👤 **Player 3**
🔗 [Rocket League Tracker](https://rocketleague.tracker.network/rocket-league/profile/epic/PLAYER3/overview)`
    },
{
      name: "<:GC1:1526925006205091864> <:GC2:1526924992686719047> GC1 - GC2",
        value:
`👤 **Player 1**
🔗 [Rocket League Tracker](https://rocketleague.tracker.network/rocket-league/profile/epic/PLAYER1/overview)

👤 **Player 2**
🔗 [Rocket League Tracker](https://rocketleague.tracker.network/rocket-league/profile/epic/PLAYER2/overview)

👤 **Player 3**
🔗 [Rocket League Tracker](https://rocketleague.tracker.network/rocket-league/profile/epic/PLAYER3/overview)`
    },
    {
        name: "<:C3:1526925021883138118> <:GC1:1526925006205091864> C3 - GC1",
        value:
`👤 **Player 1**
🔗 [Rocket League Tracker](https://rocketleague.tracker.network/rocket-league/profile/epic/PLAYER1/overview)

👤 **Player 2**
🔗 [Rocket League Tracker](https://rocketleague.tracker.network/rocket-league/profile/epic/PLAYER2/overview)

👤 **Player 3**
🔗 [Rocket League Tracker](https://rocketleague.tracker.network/rocket-league/profile/epic/PLAYER3/overview)`
    },
    {
        name: "<:C1:1526925050329170161> <:C2:1526925034277310494> C1 - C2",
        value:
`👤 **Player 1**
🔗 [Rocket League Tracker](https://rocketleague.tracker.network/rocket-league/profile/epic/PLAYER1/overview)

👤 **Player 2**
🔗 [Rocket League Tracker](https://rocketleague.tracker.network/rocket-league/profile/epic/PLAYER2/overview)

👤 **Player 3**
🔗 [Rocket League Tracker](https://rocketleague.tracker.network/rocket-league/profile/epic/PLAYER3/overview)`
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