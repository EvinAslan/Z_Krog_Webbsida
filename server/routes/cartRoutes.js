const express = require('express');
const router = express.Router();
const cartService = require('../services/cartService');

// POST /api/cart/addProduct [cite: 208]
router.post('/addProduct', async (req, res) => {
  try {
    const { userId, productId, amount } = req.body; // Innehåll i body enligt sida 8 [cite: 210]
    const result = await cartService.addProductToCart(userId, productId, amount);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;