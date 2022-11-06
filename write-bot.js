// Run dotenv
require('dotenv').config();

const { EmbedBuilder, WebhookClient } = require('discord.js');

const webhookClient = new WebhookClient({ url: 'https://discord.com/api/webhooks/1038616695817900042/bOfdjcOAV7f1Lqyn9meaY5D31X4UymRDIlDzSUSjzNgCgff--p5S8IJ2GRsjXxHItOPh' });

const embed = new EmbedBuilder()
    .setTitle('Some Title')
    .setColor(0x00FFFF);

webhookClient.send({
    content: 'Webhook test',
    username: 'xmtp-bot',
    avatarURL: 'https://i.imgur.com/AfFp7pu.png',
    embeds: [embed],
});