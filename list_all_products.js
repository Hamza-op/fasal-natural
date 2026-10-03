const fs = require('fs');
const data = JSON.parse(fs.readFileSync('products.json', 'utf8'));

console.log(`Total: ${data.products.length}`);
data.products.forEach((p, idx) => {
  console.log(`${idx + 1}. [${p.handle}] "${p.title}" -> ${p.images.length} images`);
});
