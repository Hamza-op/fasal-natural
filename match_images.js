const fs = require('fs');

const data = JSON.parse(fs.readFileSync('products.json', 'utf8'));
console.log(`Loaded ${data.products.length} products.`);

const ourProducts = [
  { key: 'simple', query: /simple.*sohan/i },
  { key: 'badami', query: /badam/i },
  { key: 'akhroti', query: /akhroti/i },
  { key: 'double_akhroti', query: /double.*akhrot/i },
  { key: 'mix_dry_fruit', query: /mix.*halwa|dry.*fruit.*sohan/i },
  { key: 'pista', query: /pista/i },
  { key: 'special', query: /shahi|special/i },
  { key: 'panjeeri', query: /panjeeri/i },
  { key: 'ghee', query: /ghee/i }
];

console.log("=== Matching Products ===");
ourProducts.forEach(item => {
  const matches = data.products.filter(p => item.query.test(p.title) || item.query.test(p.handle));
  console.log(`\nTarget: ${item.key}`);
  matches.forEach(m => {
    console.log(`  - Title: ${m.title} (handle: ${m.handle})`);
    console.log(`    Images (${m.images.length}):`);
    m.images.forEach(img => console.log(`      * ${img.src}`));
  });
});
