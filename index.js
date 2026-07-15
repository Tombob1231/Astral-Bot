require("dotenv").config();

const { Client, Collection, GatewayIntentBits } = require("discord.js");
const fs = require("fs");
const path = require("path");

require("./database/setup");

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

client.commands = new Collection();

/*
    Load Commands
*/

const commandFiles = fs
    .readdirSync(path.join(__dirname, "commands"))
    .filter(file => file.endsWith(".js"));

for (const file of commandFiles) {
    try {
        const command = require(`./commands/${file}`);

        console.log(`Loading: ${file}`);

        if (!command.data) {
            console.log(`❌ ${file} does not export 'data'`);
            continue;
        }

        console.log(`Registered command: ${command.data.name} (${file})`);
client.commands.set(command.data.name, command);

    } catch (err) {
        console.log(`❌ Error loading ${file}`);
        console.error(err);
    }
}

/*
    Load Events
*/

const eventFiles = fs
    .readdirSync(path.join(__dirname, "events"))
    .filter(file => file.endsWith(".js"));

for (const file of eventFiles) {

    const event = require(`./events/${file}`);

    if (event.once) {
        client.once(event.name, (...args) =>
            event.execute(...args, client)
        );
    } else {
        client.on(event.name, (...args) =>
            event.execute(...args, client)
        );
    }

}

client.login(process.env.TOKEN);