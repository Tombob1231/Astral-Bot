const Parser = require("rss-parser");

const parser = new Parser();

const FEED_URL = "https://rss.app/feeds/uhnYidbmfZ2PKdIG.xml";
const CHANNEL_ID = "1527711897263145130";
const ROLE_ID = "1516436462860632096";

let lastLink = null;

async function checkTikTok(client) {
    try {

        const feed = await parser.parseURL(FEED_URL);

        if (!feed.items.length) return;

        const latest = feed.items[0];

        if (lastLink === null) {
            lastLink = latest.link;
            console.log("TikTok checker ready.");
            return;
        }

        if (latest.link === lastLink) return;

        lastLink = latest.link;

        const channel = await client.channels.fetch(CHANNEL_ID);

        if (!channel) return;

        await channel.send({
            content: `<@&${ROLE_ID}>`,
            embeds: [
                {
                    color: 0xff0050,
                    title: "📹 New TikTok Uploaded!",
                    description: `**${latest.title}**`,
                    url: latest.link,
                    footer: {
                        text: "@team.astral7"
                    },
                    timestamp: new Date()
                }
            ]
        });

        console.log("New TikTok posted.");

    } catch (err) {
        console.error("TikTok checker error:", err);
    }
}

module.exports = (client) => {

    checkTikTok(client);

    setInterval(() => {
        checkTikTok(client);
    }, 300000);

};