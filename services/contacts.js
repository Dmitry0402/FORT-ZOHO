const axios = require("axios");
const { getAccessToken } = require("./zoho");

async function searchContacts(searchText) {
    const accessToken = await getAccessToken();

    const response = await axios.get(
        `https://www.zohoapis.com/crm/v8/Contacts/search?word=${encodeURIComponent(searchText)}`,
        {
            headers: {
                Authorization: `Zoho-oauthtoken ${accessToken}`
            }
        }
    );

    return response.data;
}

module.exports = {
    searchContacts
};