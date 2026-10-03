const fs = require('fs');
const catalog = JSON.parse(fs.readFileSync('analyzed_catalog.json', 'utf8'));

console.log(`Total Products: ${catalog.total}`);
const categorySummary = {};
catalog.sampleProducts.forEach(p => {
  const cat = p.product_type || 'Halwa / Sweets';
  if (!categorySummary[cat]) categorySummary[cat] = [];
  categorySummary[cat].push({
    title: p.title,
    price: `PKR ${p.price}`,
    options: p.options.map(o => `${o.name}: [${o.values.join(', ')}]`).join(' | ')
  });
});

for (const [cat, items] of Object.entries(categorySummary)) {
  console.log(`\n=== Category: ${cat} (${items.length} items) ===`);
  items.slice(0, 5).forEach(i => {
    console.log(`  - ${i.title} -> ${i.price} (${i.options})`);
  });
}
