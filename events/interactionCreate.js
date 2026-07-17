const deleteTicket = require("../tickets/deleteTicket");
const createTicket = require("../tickets/createTicket");
const claimTicket = require("../tickets/claimTicket");
const createApplication = require("../tickets/createApplication");
const acceptApplication = require("../tickets/acceptApplication");
const denyApplication = require("../tickets/denyApplication");
const roleManager = require("../utils/roleManager");

module.exports = {
    name: "interactionCreate",

    async execute(interaction) {

        // Slash Commands
        if (interaction.isChatInputCommand()) {

            const command = interaction.client.commands.get(interaction.commandName);

            if (!command) return;

           try {

   console.log("🚨 INTERACTION RECEIVED");
console.log(`Running command: ${interaction.commandName}`);
        
        

    await command.execute(interaction);

    console.log(`Finished command: ${interaction.commandName}`);

} catch (err) {

    console.error("===== COMMAND ERROR =====");
    console.error(err);
    console.error(err.stack);

    if (!interaction.replied && !interaction.deferred) {
        await interaction.reply({
            content: "❌ There was an error while running this command.",
            ephemeral: true
        });
    }

}

return;
        }

       // Buttons
if (interaction.isButton()) {

    const roleButtons = [
        "role_announcements",
        "role_socials",
        "role_lft",
        "role_lfp",

        "rl_p1",
        "rl_p2",
        "rl_p3",

        "rl_d1",
        "rl_d2",
        "rl_d3",

        "rl_c1",
        "rl_c2",
        "rl_c3",

        "rl_gc1",
        "rl_gc2",
        "rl_gc3",

        "rl_ssl"
    ];

    if (roleButtons.includes(interaction.customId)) {
        return await roleManager(interaction);
    }

    if (interaction.customId === "accept_application") {
        return await acceptApplication(interaction);
    }

    if (interaction.customId === "deny_application") {
        return await denyApplication(interaction);
    }

    // ...the rest of your existing button handlers...

            if (interaction.customId === "accept_application") {
    return await acceptApplication(interaction);
}

if (interaction.customId === "deny_application") {
    return await denyApplication(interaction);
}

            if (interaction.customId === "open_ticket") {
                return await createTicket(interaction);
            }

            if (interaction.customId === "claim_ticket") {
                return await claimTicket(interaction);
            }

            if (interaction.customId === "close_ticket") {

                await interaction.reply({
                    content: "🔒 Closing ticket in 5 seconds...",
                    ephemeral: true
                });

                setTimeout(async () => {
                    await interaction.channel.delete().catch(console.error);
                }, 5000);

                return;
            }
if (interaction.customId === "close_coaching_ticket") {
    await interaction.reply({
        content: "🔒 Closing coaching ticket in 5 seconds...",
        ephemeral: true
    });

    setTimeout(async () => {
        await interaction.channel.delete().catch(console.error);
    }, 5000);

    return;
}
            if (interaction.customId === "delete_ticket") {
                return await deleteTicket(interaction);
            }

    if (interaction.customId === "apply_coach") {
    return await createApplication(interaction, "coach");
}

if (interaction.customId === "apply_mod") {
    return await createApplication(interaction, "mod");
}

if (interaction.customId === "apply_team") {
    return await createApplication(interaction, "team");
}

if (interaction.customId === "request_coaching") {
    return await require("../tickets/createCoachingTicket")(interaction);
}
        }

    }

};