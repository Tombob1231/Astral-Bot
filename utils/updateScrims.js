const { EmbedBuilder } = require("discord.js");
const db = require("../database/database");

const CHANNEL_ID = "1526946804514426951";
const MESSAGE_ID = "1526953484598116525";

async function updateScrims(client) {

    console.log("Updating scrims...");

    try {

        const channel = await client.channels.fetch(CHANNEL_ID);
        console.log("Channel found:", channel.name);

        const message = await channel.messages.fetch(MESSAGE_ID);
        console.log("Message found!");

        db.all(
            "SELECT * FROM scrims ORDER BY id DESC LIMIT 5",
            [],
            async (err, rows) => {

                if (err) return console.error(err);

                let description = "# 🗓 Upcoming Scrims\n\n";

                if (rows.length === 0) {

                    description += "No upcoming scrims.";

                } else {

                    for (const scrim of rows) {

                        description += `━━━━━━━━━━━━━━━━━━━━━━

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

                console.log("Editing message...");

                await message.edit({
                    embeds: [embed]
                });

                console.log("Scrims message updated!");

            }
        );

    } catch (err) {
        console.error("Failed to update scrims message:");
        console.error(err);
    }

}

module.exports = updateScrims;