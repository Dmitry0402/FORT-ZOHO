const axios = require("axios");
const { getAccessToken } = require("./zoho");

async function getLeads() {
    const accessToken = await getAccessToken();

    const response = await axios.get(
        "https://www.zohoapis.com/crm/v8/Leads?fields=Last_Name,First_Name,Company,Email",
        {
            headers: {
                Authorization: `Zoho-oauthtoken ${accessToken}`
            }
        }
    );

    return response.data;
}

async function searchLeads(searchText) {
    const accessToken = await getAccessToken();

    const response = await axios.get(
        `https://www.zohoapis.com/crm/v8/Leads/search?word=${encodeURIComponent(searchText)}`,
        {
            headers: {
                Authorization: `Zoho-oauthtoken ${accessToken}`
            }
        }
    );

    return response.data;
}

async function createLead(leadData) {
    const accessToken = await getAccessToken();

    const response = await axios.post(
        "https://www.zohoapis.com/crm/v8/Leads",
        {
            data: [leadData]
        },
        {
            headers: {
                Authorization: `Zoho-oauthtoken ${accessToken}`
            }
        }
    );

    return response.data;
}

module.exports = {
    getLeads,
    searchLeads,
    createLead
};
