const fs = require('fs');
const path = require('path');

const mapPath = path.join(__dirname, 'extracted_photos_map.json');
let map = JSON.parse(fs.readFileSync(mapPath, 'utf8'));

// Filter out any pure-desi-ghee entry that was from external
map = map.filter(item => item.product_id !== 'pure-desi-ghee');

fs.writeFileSync(mapPath, JSON.stringify(map, null, 2));
console.log('Cleaned extracted_photos_map.json. Total client products:', map.length);
