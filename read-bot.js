// Run dotenv
require('dotenv').config();

const {
    Client,
    Collection,
    GatewayIntentBits,
    Events,
    REST,
    Routes,
    SlashCommandBuilder,
} = require('discord.js');
const { getData, formatMessage } = require('./utils.js');
const { sendXMTPMessage } = require('./xmtp.js');

const sendCommand = new SlashCommandBuilder()
    .setName('send')
    .setDescription('Send a message to an Ethereum wallet address.')
    .addStringOption(option =>
        option
            .setName('wallet')
            .setDescription('Ethereum wallet address')
            .setRequired(true))
    .addStringOption(option =>
        option
            .setName('message')
            .setDescription('Message to send')
            .setRequired(true));

const commands = [sendCommand];

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

(async () => {
    try {
        console.log('Started refreshing application (/) commands.');
        await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), { body: commands });
        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error(error);
    }
})();

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// client.commands = new Collection();
// client.commands.set(sendCommand.name, sendCommand);

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on(Events.InteractionCreate, async (interaction) => {
    if (!interaction.isChatInputCommand()) {
        return;
    }

    if (interaction.commandName === 'send') {
        const senderDiscordID = interaction.user.id;
        const recipientWalletAddress = interaction.options.getString("wallet");
        const message = interaction.options.getString("message");

        await interaction.reply('Sending message...');
        try {
            const { senderWalletAddress, recipientDiscordID } = await getData(senderDiscordID, recipientWalletAddress);
            const formattedMessage = formatMessage(senderWalletAddress, recipientWalletAddress, message);
            // Send on XMTP
            await sendXMTPMessage(recipientWalletAddress, formattedMessage);
            // Send on Discord
            console.log(recipientDiscordID)
            client.users.fetch(recipientDiscordID, false)
                .then((user) => user.send(formattedMessage))
                .catch((err) => console.log(err));
        } catch (error) {
            console.log(error)
            client.users.fetch(senderDiscordID, false)
                .then((user) => user.send(error.response.data.message))
                .catch((err) => console.log(err));
        }
    }
});

client.login(process.env.DISCORD_TOKEN);