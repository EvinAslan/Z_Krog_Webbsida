const { Product } = require('./server/models');

async function dump() {
  const all = await Product.findAll();
  console.log("ID | TITLE | CATEGORY | PRICE1");
  all.forEach(p => {
    if (p.category.toUpperCase().includes('PIZZA') || p.category.toUpperCase().includes('PRISKLASS')) {
      console.log(`${p.id} | ${p.title} | ${p.category} | ${p.price1}`);
    }
  });
}
dump();
