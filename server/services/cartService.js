const { Cart, CartRow } = require('../models');

const cartService = {
  async addProductToCart(userId, productId, amount) {
    // Find or create cart for this user
    const [cart] = await Cart.findOrCreate({
      where: { user_id: userId, payed: false },
      defaults: { payed: false }
    });

    // Check if product is already in the cart
    const existingRow = await CartRow.findOne({
      where: { cart_id: cart.id, product_id: productId }
    });

    if (existingRow) {
      // Already in cart — just increment amount
      return await existingRow.update({ amount: existingRow.amount + Number(amount) });
    } else {
      // cart.addProduct() is the correct belongsToMany method —
      // safer than CartRow.create() because cart_id and product_id
      // are NOT defined as explicit fields in cart_row.js
      await cart.addProduct(productId, { through: { amount: Number(amount) } });
      return { cart_id: cart.id, product_id: productId, amount };
    }
  }
};

module.exports = cartService;
