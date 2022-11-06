// Run dotenv
require('dotenv').config();

const { EmbedBuilder, WebhookClient } = require('discord.js');

const webhookClient = new WebhookClient({ url: 'https://discord.com/api/webhooks/1038616695817900042/bOfdjcOAV7f1Lqyn9meaY5D31X4UymRDIlDzSUSjzNgCgff--p5S8IJ2GRsjXxHItOPh' });

const writeMessage = (content) => {
    const embed = new EmbedBuilder()
        .setTitle('Notification')
        .setColor(0x00FFFF);

    webhookClient.send({
        content: `From: ${content.sender}\nTo: ${content.recipient}\n\n@${content.userID}\n${content.message}`,
        username: 'xmtp-bot',
        avatarURL: '',
        // embeds: [embed],
    });
}

writeMessage(
    {
        sender: '0xsender',
        recipient: '0xrecipient',
        userID: '721397273568870440',
        message: 'thanks for supporting my artwork! new drop next week!!!',
    },
);
