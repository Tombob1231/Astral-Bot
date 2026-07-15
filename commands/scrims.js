const {
    SlashCommandBuilder,
    EmbedBuilder
} = require("discord.js");

const db = require("../database/database");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("scrims")
        .setDescription("Displays Astral's upcoming scrims."),

   async execute(interaction) {

    db.all(
        "SELECT * FROM scrims ORDER BY id DESC LIMIT 5",
        [],
        async (err, rows) => {

            if (err) {
                console.error(err);

                return interaction.reply({
                    content: "❌ Failed to load scrims.",
                    ephemeral: true
                });
            }

            let description = "# 🗓 Upcoming Scrims\n\n";

            if (rows.length === 0) {

                description += "No upcoming scrims.";

            } else {

                for (const scrim of rows) {

                    description +=
`━━━━━━━━━━━━━━━━━━━━━━

⚔️ **Astral vs ${scrim.opponent}**

📅 ${scrim.date}
🕖 ${scrim.time}
🏆 ${scrim.tournament}
📺 ${scrim.stream}

`;
                }

            }

            const embed = new EmbedBuilder()
                .setColor("#8A2BE2")
                .setImage("https://cdn.discordapp.com/attachments/1526902981516333186/1526951013041569973/Scrims.png?ex=6a58e372&is=6a5791f2&hm=fd7e6ac085588a6e4a6aea6d1d13d55b78de2738da54afc6069fd759e9bd5515&")
                .setDescription(description)
                .setFooter({
                    text: "⭐ Together We Rise ⭐"
                })
                .setTimestamp();

               await interaction.reply({
                embeds: [embed]
            });

        }
    );

    }

};