const axios = require("axios");
const qs = require("qs");

async function getAccessToken() {
    const response = await axios.post(
        "https://accounts.zoho.com/oauth/v2/token",
        qs.stringify({
            refresh_token: process.env.ZOHO_REFRESH_TOKEN,
            client_id: process.env.ZOHO_CLIENT_ID,
            client_secret: process.env.ZOHO_CLIENT_SECRET,
            grant_type: "refresh_token"
        }),
        {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }
    );

    return response.data.access_token;
}

module.exports = {
    getAccessToken
};