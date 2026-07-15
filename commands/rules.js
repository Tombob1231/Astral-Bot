const {
    SlashCommandBuilder,
    EmbedBuilder
} = require("discord.js");

const config = require("../config");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("rules")
        .setDescription("Displays the Astral server rules."),

    async execute(interaction) {

        // Optional: Only moderators can use this command
        if (!interaction.member.roles.cache.has(config.modRole)) {
            return interaction.reply({
                content: "❌ You don't have permission to use this command.",
                ephemeral: true
            });
        }

        const embed = new EmbedBuilder()
            .setColor("#8A2BE2")
            .setTitle("🌌 Astral Community Rules")
            .setImage("https://cdn.discordapp.com/attachments/1526902981516333186/1526904702602707074/Welcome_To_astral.png?ex=6a58b851&is=6a5766d1&hm=a95e2f7d2460076f22e4b871e7ddc316e4a3c1d6b1ccd6c32ce2242fa9564055&")
            .setDescription(`
## 📜 1. Respect Everyone
Treat every member with respect. Harassment, bullying, or hate speech will not be tolerated.

## 💬 2. Keep Chat Friendly
Keep conversations respectful. Toxicity and drama are not welcome.

## 🚫 3. No Spam
Do not spam messages, emojis, reactions, or mentions.

## 🔗 4. No Advertising
Advertising other servers or services without staff approval is prohibited.

## 🎮 5. Fair Play
Represent Astral with sportsmanship. Cheating or exploiting is not allowed.

## 👤 6. Appropriate Profiles
Usernames, profile pictures, and nicknames must be appropriate.

## 🎫 7. Use Channels Correctly
Use the correct channels and only create tickets when needed.

## 📝 8. Honest Applications
Provide truthful information in all applications.

## 👮 9. Respect Staff
Respect staff decisions. If you disagree, open a support ticket.

## ⚖️ 10. Follow Discord's Terms of Service
All members must follow Discord's Terms of Service and Community Guidelines.

---

### ⭐ Together We Rise ⭐

**Punishments may include:**

⚠️ Warning  
🔇 Timeout  
🚫 Kick  
🔨 Ban
`)
            .setFooter({
                text: "Astral • Together We Rise"
            })
            .setTimestamp();

        await interaction.reply({
            embeds: [embed]
        });

    }
};