console.log("FORT Zoho Connector");

require("dotenv").config();

const express = require("express");
const { getAccessToken } = require("./services/zoho");
const { getLeads, searchLeads } = require("./services/crm");
const { searchContacts } = require("./services/contacts");
const app = express();

app.get("/", (req, res) => {
    res.send("FORT Zoho Connector is running!");
});

app.get("/token", async (req, res) => {
    try {
        const accessToken = await getAccessToken();
        res.json({ access_token: accessToken });
    } catch (error) {
        res.status(500).json(error.response?.data || { error: error.message });
    }
});

app.get("/leads", async (req, res) => {
    try {
        const leads = await getLeads();
        res.json(leads);
    } catch (error) {
        res.status(500).json(error.response?.data || { error: error.message });
    }
});

app.get("/search", async (req, res) => {
    try {
        const q = req.query.q;

        if (!q) {
            return res.status(400).json({
                error: "Missing query parameter q"
            });
        }

        const result = await searchLeads(q);
        res.json(result);

    } catch (error) {
        res.status(500).json(error.response?.data || { error: error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.get("/contacts", async (req, res) => {
    try {
        const result = await searchContacts(req.query.q);
        res.json(result);
    } catch (error) {
        res.status(500).json(error.response?.data || { error: error.message });
    }
});
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});