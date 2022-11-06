const axios = require('axios');

const getData = (senderDiscordID, recipientWalletAddress) => {
    const url = `https://0xrelay.vercel.app/api/lookup?recipientAddress=${recipientWalletAddress}&senderDiscordId=${senderDiscordID}`;
    return axios.get(url)
        .then(resp => {
            const { recipientDiscordId: recipientDiscordID, senderAddress: senderWalletAddress } = resp.data;
            return { recipientDiscordID, senderWalletAddress };
        });
}

const formatMessage = (senderWalletAddress, recipientWalletAddress, message) => {
    return `From: ${senderWalletAddress}\nTo: ${recipientWalletAddress}\n\n${message}`;
}

module.exports = { getData, formatMessage };
