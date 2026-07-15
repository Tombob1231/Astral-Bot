const config = require("../config");

const warnings = new Map();

module.exports = {
    name: "messageCreate",

    async execute(message) {

        // Ignore bots
        if (message.author.bot) return;

        // Ignore DMs
        if (!message.guild) return;

        // Ignore moderators
        if (message.member.roles.cache.has(config.modRole)) return;

        // Anti Discord Invites
        const inviteRegex = /(discord\.gg|discord\.com\/invite)\/\S+/i;

        if (inviteRegex.test(message.content)) {

            await message.delete().catch(() => {});

            const userId = message.author.id;

            const currentWarnings = (warnings.get(userId) || 0) + 1;
            warnings.set(userId, currentWarnings);

            await message.channel.send({
                content: `⚠️ ${message.author}, Discord invite links aren't allowed. (${currentWarnings}/${config.automodWarnings})`
            });

            // Auto timeout
            if (currentWarnings >= config.automodWarnings) {

                warnings.set(userId, 0);

                try {

                    await message.member.timeout(
                        config.automodTimeout * 60 * 1000,
                        "AutoMod: Too many invite links."
                    );

                    await message.channel.send({
                        content: `⏰ ${message.author} has been timed out for ${config.automodTimeout} minutes.`
                    });

                } catch (err) {
                    console.log(err);
                }

            }

            // Log
            const logChannel = message.guild.channels.cache.get(config.automodLogs);

            if (logChannel) {

                await logChannel.send({
                    content:
`🚫 **AutoMod**

**User:** ${message.author}
**Reason:** Discord Invite
**Warnings:** ${currentWarnings}/${config.automodWarnings}`
                });

            }

        }

    }

};