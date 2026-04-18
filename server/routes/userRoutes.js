const express = require('express');
const router = express.Router();
const userService = require('../services/userService');

// GET /api/users/:id/cart - Hämta en specifik användares varukorg
router.get('/:id/cart', async (req, res) => {
  try {
    const cart = await userService.getUserCart(req.params.id);
    
    if (!cart) {
      return res.json({ Products: [] });
    }
    
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST /api/users - Skapa en ny användare (för registrering)
router.post('/', async (req, res) => {
  try {
    const newUser = await userService.createUser(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;