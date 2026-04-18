const { User, Cart, Product, CartRow } = require('../models');

const userService = {
  // Hämta användarens varukorg inklusive alla produkter (Krav sida 7 & 8)
  async getUserCart(userId) {
    return await Cart.findOne({
      where: { user_id: userId, payed: false }, // Hämtar den aktiva korgen
      include: [
        {
          model: Product,
          through: { attributes: ['amount'] } // Inkluderar antal från kopplingstabellen
        }
      ]
    });
  },

  // Skapa en ny användare
  async createUser(userData) {
    return await User.create(userData);
  }
};

module.exports = userService;