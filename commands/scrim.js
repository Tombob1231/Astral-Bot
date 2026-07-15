const updateScrims = require("../utils/updateScrims");
const { EmbedBuilder } = require("discord.js");
const db = require("../database/database");

const CHANNEL_ID = "1526946804514426951";
const MESSAGE_ID = "1526953484598116525";

async function updateScrims(client) {
    try {
        const channel = await client.channels.fetch(CHANNEL_ID);
        const message = await channel.messages.fetch(MESSAGE_ID);

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

                await message.edit({
                    embeds: [embed]
                });

            }
        );

    } catch (err) {
        console.error("Failed to update scrims message:", err);
    }
}

module.exports = updateScrims;

const {
    SlashCommandBuilder,
    PermissionFlagsBits
} = require("discord.js");

const db = require("../database/database");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("scrim")
        .setDescription("TEST 123")
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)

        .addSubcommand(subcommand =>
            subcommand
                .setName("add")
                .setDescription("Add a new scrim.")
                .addStringOption(option =>
                    option
                        .setName("opponent")
                        .setDescription("Opponent name")
                        .setRequired(true))
                .addStringOption(option =>
                    option
                        .setName("date")
                        .setDescription("Scrim date")
                        .setRequired(true))
                .addStringOption(option =>
                    option
                        .setName("time")
                        .setDescription("Scrim time")
                        .setRequired(true))
                .addStringOption(option =>
                    option
                        .setName("tournament")
                        .setDescription("Tournament or event")
                        .setRequired(true))
                .addStringOption(option =>
                    option
                        .setName("stream")
                        .setDescription("Stream link or TBA")
                        .setRequired(true))
        ),

    async execute(interaction) {

        const subcommand = interaction.options.getSubcommand();

        if (subcommand === "add") {

            const opponent = interaction.options.getString("opponent");
            const date = interaction.options.getString("date");
            const time = interaction.options.getString("time");
            const tournament = interaction.options.getString("tournament");
            const stream = interaction.options.getString("stream");

            db.run(
    `INSERT INTO scrims (opponent, date, time, tournament, stream)
     VALUES (?, ?, ?, ?, ?)`,
    [opponent, date, time, tournament, stream],
    async (err) => {

        if (err) {
            console.error(err);

            return interaction.reply({
                content: "❌ Failed to save the scrim.",
                ephemeral: true
            });
        }

      await interaction.reply({
    content: "✅ Scrim added successfully!",
    ephemeral: true
});

try {
    await updateScrims(interaction.client);
} catch (err) {
    console.error("Update scrims failed:");
    console.error(err);
}

    }
);
        }

    }
};