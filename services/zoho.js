const axios = require("axios");
const qs = require("qs");

async function getAccessToken() {
    try {
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

        console.log("Zoho token received successfully");

        return response.data.access_token;

    } catch (error) {

        console.error("ZOHO TOKEN ERROR");
        console.error(error.response?.status);
        console.error(error.response?.data);

        throw error;
    }
}

module.exports = {
    getAccessToken
};