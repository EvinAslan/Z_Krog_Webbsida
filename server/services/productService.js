const { Product, Rating, Cart, CartRow } = require('../models');

const productService = {
  // Hjälpmetod för att "städa" produktobjekt 
 _cleanProduct(product) {
    const plainProduct = product.get({ plain: true });
    const ratings = plainProduct.Ratings || [];
    const total = ratings.reduce((sum, r) => sum + r.rating, 0);
    const average = ratings.length > 0 ? total / ratings.length : 0;

    return {
      id: plainProduct.id,
      category: plainProduct.category,
      title: plainProduct.title,
      description: plainProduct.description,
      price1: plainProduct.price1,
      price2: plainProduct.price2,
      price3: plainProduct.price3,
      price4: plainProduct.price4,
      image_url: plainProduct.image_url,
      averageRating: average.toFixed(1), // Genomsnittet av betygen, avrundat till 1 decimal
      reviewCount: ratings.length,        // ANTAL personer som röstat
      // Lista av individuella betyg med id, rating och createdAt (för att kunna visa senaste betygen i frontend)
      ratings: ratings.map(r => ({ id: r.id, rating: r.rating, createdAt: r.createdAt })),
      custom_price1: plainProduct.custom_price1,
      custom_price2: plainProduct.custom_price2,
      custom_price3: plainProduct.custom_price3,
      custom_price4: plainProduct.custom_price4,
      custom_image_pruduct: plainProduct.custom_image_pruduct
    };
  },

  async getAllProducts() {
    const products = await Product.findAll({ include: [Rating] });
    return products.map(p => this._cleanProduct(p));
  },

  async getProductById(id) {
    const product = await Product.findByPk(id, { include: [Rating] });
    if (!product) return null;
    return this._cleanProduct(product);
  },

  async getMenu() {
    //  här så vi får med betygen från start
    const products = await Product.findAll({ include: [Rating] }); 
    const plain = products.map(p => (p.get ? p.get({ plain: true }) : p));

    const grouped = {};
    plain.forEach(p => {
      const cat = (p.category || 'Övrigt').toString();
      if (!grouped[cat]) grouped[cat] = [];
      grouped[cat].push(p);
    });

    const out = {};
    let catCounter = 1;

    Object.entries(grouped).forEach(([catName, items]) => {
      const masterInfo = items.find(it => it.title?.trim().toLowerCase() === "kategori info") || items[0];
      const itemlist = {};
      let itemCounter = 1;

      items.forEach((it) => {
        const isInfoRow = it.title?.trim().toLowerCase() === "kategori info";
        if (!isInfoRow) {
          // Räkna ut snitt och antal för just denna produkt
          const ratings = it.Ratings || [];
          const avg = ratings.length > 0 ? ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length : 0;

          // Skicka med: [namn, beskrivning, id, snittbetyg, antal]
          itemlist[`item${itemCounter++}`] = [
            it.title.trim(), 
            it.description || '', 
            it.id, 
            avg.toFixed(1), 
            ratings.length,
            it.custom_price1 || 0,
            it.custom_price2 || 0,
            it.custom_price3 || 0,
            it.custom_price4 || 0,
            it.custom_image_pruduct
          ];
        }
      });

      out[`Category${catCounter++}`] = [
        (masterInfo.description || catName).toLowerCase().trim(),
        catName,
        {
          price1: masterInfo.price1 || 0,
          price2: masterInfo.price2 || 0,
          price3: masterInfo.price3 || 0,
          price4: masterInfo.price4 || 0,
          imageClass: masterInfo.image_url || '',
          itemlist
        }
      ];
    });

    return out;
  },

  async addRating(productId, ratingValue) {
  // Vi tvingar fram siffror för att vara säkra
  const pId = parseInt(productId);
  const val = parseFloat(ratingValue);

  if (isNaN(pId) || isNaN(val)) {
    throw new Error("Invalid ID or Rating value");
  }

  return await Rating.create({
    product_id: pId,
    rating: val
  });
},

  // Logik för att lägga produkt i varukorg 
  async addProductToCart(userId, productId, amount) {
    // Hitta eller skapa senaste varukorg (Sida 8) [cite: 220, 222]
    const [cart] = await Cart.findOrCreate({
      where: { user_id: userId, payed: false }
    });

    // Spara i kopplingstabell cart_row 
    const [row, created] = await CartRow.findOrCreate({
      where: { cart_id: cart.id, product_id: productId },
      defaults: { amount: amount }
    });

    if (!created) {
      // Om den redan finns, uppdatera antalet 
      await row.update({ amount: row.amount + amount });
    }
    return row;
  },

  async createProduct(productData) { return await Product.create(productData); },
  async updateProduct(id, productData) {
    const product = await Product.findByPk(id);
    return product ? await product.update(productData) : null;
  },
  async deleteProduct(id) {
    const product = await Product.findByPk(id);
    if (product) { await product.destroy(); return true; }
    return false;
  }
};

module.exports = productService; 