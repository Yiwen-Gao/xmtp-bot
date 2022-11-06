const axios = require('axios');

const getData = (senderDiscordID, recipientWalletAddress) => {
    const url = `https://0xrelay.vercel.app/api/lookup?recipientAddress=${recipientWalletAddress}&senderDiscordId=${senderDiscordID}`;
    console.log('URL', url)
    return axios.get(url)
        .then(resp => {
            const { recipientDiscordId: recipientDiscordID, senderAddress: senderWalletAddress } = resp.data;
            console.log('[DEBUG]', resp, recipientDiscordID, senderWalletAddress)
            return { recipientDiscordID, senderWalletAddress };
        });
}

const formatMessage = (senderWalletAddress, recipientWalletAddress, message) => {
    console.log('format message')
    return `From: ${senderWalletAddress}\nTo: ${recipientWalletAddress}\n\n${message}`;
}

module.exports = { getData, formatMessage };
