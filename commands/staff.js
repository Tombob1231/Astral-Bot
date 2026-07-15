const {
    SlashCommandBuilder,
    EmbedBuilder
} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("staff")
        .setDescription("Displays Astral's staff team."),

    async execute(interaction) {

        const embed = new EmbedBuilder()
            .setColor("#8A2BE2")
            .setImage("https://cdn.discordapp.com/attachments/1526902981516333186/1526956482749272085/ChatGPT_Image_Jul_15_2026_03_19_35_PM.png?ex=6a58e88a&is=6a57970a&hm=2a2b96972294cab35f2a524aaca54cbdc64fb61fd713398918fa47647e56bf74&")
            .setDescription(`
# 👥 Staff Team

## 👑 Owners
━━━━━━━━━━━━━━━━━━━━━━

👑 <@1492572420966580396>
👑 <@1003747564358737981>

## 🛡 Administrators
━━━━━━━━━━━━━━━━━━━━━━

🛡 <@ADMIN_ID>
🛡 <@ADMIN_ID>

## ⚔ Moderators
━━━━━━━━━━━━━━━━━━━━━━

⚔ <@652854947641163778>
⚔ <@1268875118923354115>
⚔ <@978007660962136154>

## 🎮 Coaches
━━━━━━━━━━━━━━━━━━━━━━

🎮 <@COACH_ID>
🎮 <@COACH_ID>

━━━━━━━━━━━━━━━━━━━━━━
`)
            .setFooter({
                text: "⭐ Together We Rise ⭐"
            })
            .setTimestamp();

        await interaction.reply({
            embeds: [embed]
        });

    }
};