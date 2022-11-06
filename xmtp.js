const { Client } = require('@xmtp/xmtp-js');
const { Wallet } = require('ethers');

const sendXMTPMessage = async (recipientAddress, message) => {
    const botWallet = Wallet.createRandom();
    const xmtp = await Client.create(botWallet);
    const conversation = await xmtp.conversations.newConversation(recipientAddress);
    await conversation.send(message);
}

module.exports = { sendXMTPMessage };