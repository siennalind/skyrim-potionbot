require("dotenv").config();
const { Client, Intents } = require("discord.js");
const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES
    ]
});
const ingredients = require("./ingredients.js");


// Check that the bot started okay
client.once("ready", () => {
    console.log("Let's mix some potions!");
})


// Search for ingredient effects by ingredient name, case & space insensitive
client.on("messageCreate", (message) => {
    if (message.content.startsWith('?')) {
        const searchTerm = message.content.substring(1).replace(/\s/g, '').toLowerCase();

        for (keys in ingredients) {
            if (keys.toLowerCase() === searchTerm) {
        // message.reply("Found something");
        message.reply(ingredients[keys]['effects'].join("\n"));
        }}
    }})

// Search for ingredients by effect, case insensitive
// TODO: Allow any number of spaces
client.on("messageCreate", (message) => {
    if (message.content.startsWith('>')) {
        // Format the effect name
        const searchEffect = message.content.substring(1).toLowerCase();
        const searchResults = [];
    
        for (keys in ingredients) {
            for (element of ingredients[keys]['effects']) {
                if (element.toLowerCase() === searchEffect) {
                searchResults.push(ingredients[keys]['name']);
                }}}
        message.reply(searchResults.join("\n"));
}})


client.login(process.env.TOKEN);