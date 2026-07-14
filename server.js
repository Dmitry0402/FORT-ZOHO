console.log("FORT Zoho Connector");

require("dotenv").config();

const express = require("express");

const { getAccessToken } = require("./services/zoho");
const {
    getLeads,
    searchLeads,
    createLead
} = require("./services/crm");

const { searchContacts } = require("./services/contacts");

const app = express();

app.use(express.json());
app.use(express.static(__dirname));

// Home
app.get("/", (req, res) => {
    res.send("FORT Zoho Connector is running!");
});

// Get Zoho access token
app.get("/token", async (req, res) => {
    try {
        const accessToken = await getAccessToken();
        res.json({ access_token: accessToken });
    } catch (error) {
        res.status(500).json(error.response?.data || { error: error.message });
    }
});

// Get all leads
app.get("/leads", async (req, res) => {
    try {
        const leads = await getLeads();
        res.json(leads);
    } catch (error) {
        res.status(500).json(error.response?.data || { error: error.message });
    }
});

// Search leads
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

// Search contacts
app.get("/contacts", async (req, res) => {
    try {
        const q = req.query.q;

        if (!q) {
            return res.status(400).json({
                error: "Missing query parameter q"
            });
        }

        const result = await searchContacts(q);
        res.json(result);

    } catch (error) {
        res.status(500).json(error.response?.data || { error: error.message });
    }
});

// Create Lead
app.post("/createLead", async (req, res) => {
    try {
        const result = await createLead(req.body);
        res.json(result);
    } catch (error) {
        res.status(500).json(error.response?.data || { error: error.message });
    }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
