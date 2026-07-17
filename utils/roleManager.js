const roles = require("../config/roles");

module.exports = async (interaction) => {
    const member = interaction.member;
    const id = interaction.customId;

    // -----------------------------
    // Notification Roles
    // -----------------------------
    const notificationRoles = Object.values(roles.notifications);

    for (const role of notificationRoles) {
        if (id === role.customId) {
            const hasRole = member.roles.cache.has(role.id);

            if (hasRole) {
                await member.roles.remove(role.id);

                return interaction.reply({
                    content: `❌ Removed **${role.label}**.`,
                    ephemeral: true
                });
            }

            await member.roles.add(role.id);

            return interaction.reply({
                content: `✅ Added **${role.label}**.`,
                ephemeral: true
            });
        }
    }

    // -----------------------------
    // Community Roles
    // -----------------------------
    const communityRoles = Object.values(roles.community);

    for (const role of communityRoles) {

        if (id === role.customId) {

            const hasRole = member.roles.cache.has(role.id);

            if (hasRole) {

                await member.roles.remove(role.id);

                return interaction.reply({
                    content: `❌ Removed **${role.label}**.`,
                    ephemeral: true
                });

            }

            await member.roles.add(role.id);

            return interaction.reply({
                content: `✅ Added **${role.label}**.`,
                ephemeral: true
            });

        }

    }

    // -----------------------------
    // Rocket League Ranks
    // -----------------------------
    const rlRank = roles.rocketLeague.find(r => r.customId === id);

    if (!rlRank) return;

    const hasRole = member.roles.cache.has(rlRank.id);

    // Remove every RL rank first
    for (const rank of roles.rocketLeague) {

        if (member.roles.cache.has(rank.id)) {
            await member.roles.remove(rank.id);
        }

    }

    if (hasRole) {

        return interaction.reply({
            content: "❌ Rocket League rank removed.",
            ephemeral: true
        });

    }

    await member.roles.add(rlRank.id);

    return interaction.reply({
        content: `✅ Your Rocket League rank is now **${rlRank.label}**.`,
        ephemeral: true
    });

};