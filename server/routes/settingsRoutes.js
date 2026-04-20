const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const SETTINGS_FILE = path.join(__dirname, '../data/settings.json');

const verifyAdmin = (req, res, next) => {
  if (req.headers['authorization'] === 'pizzakung123') next();
  else res.status(403).json({ message: "Endast Admin" });
};

// GET /api/settings/openingHours
router.get('/openingHours', (req, res) => {
  try {
    if (!fs.existsSync(SETTINGS_FILE)) {
      return res.json([]); 
    }
    const data = JSON.parse(fs.readFileSync(SETTINGS_FILE, 'utf8'));
    res.json(data.openingHours || []);
  } catch (error) {
    res.status(500).json({ message: "Kunde inte läsa inställningar." });
  }
});

// PUT /api/settings/openingHours
router.put('/openingHours', verifyAdmin, (req, res) => {
  try {
    const { openingHours } = req.body;
    if (!openingHours || !Array.isArray(openingHours)) {
      return res.status(400).json({ message: "Ogiltigt dataformat." });
    }

    let currentSettings = {};
    if (fs.existsSync(SETTINGS_FILE)) {
      currentSettings = JSON.parse(fs.readFileSync(SETTINGS_FILE, 'utf8'));
    }

    currentSettings.openingHours = openingHours;
    fs.writeFileSync(SETTINGS_FILE, JSON.stringify(currentSettings, null, 2), 'utf8');
    
    res.json({ message: "Öppettider sparade!", openingHours });
  } catch (error) {
    res.status(500).json({ message: "Kunde inte spara inställningar.", error: error.message });
  }
});

module.exports = router;
