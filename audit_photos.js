const fs = require('fs');
const path = require('path');

const map = JSON.parse(fs.readFileSync('extracted_photos_map.json', 'utf8'));

console.log('=== PRODUCT TO IMAGE AUDIT ===');
map.forEach(item => {
  console.log(`\nProduct: ${item.title_en} (${item.title_ur}) [ID: ${item.product_id}]`);
  item.images.forEach(img => {
    const exists = fs.existsSync(img.localPath);
    console.log(`  - File: ${img.filename}`);
    console.log(`    Exists on disk: ${exists} (${(img.sizeBytes/1024).toFixed(1)} KB)`);
    console.log(`    Original Shopify URL: ${img.sourceUrl}`);
  });
});
