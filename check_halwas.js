const fs = require('fs');
const data = JSON.parse(fs.readFileSync('products.json', 'utf8'));

['akhroti-sohan-halwa', 'simple-sohan-halwa', 'badam-paak', 'pista-halwa', 'shahi-sohan-halwa'].forEach(h => {
  const p = data.products.find(x => x.handle === h);
  if (p) {
    console.log(`\nProduct Handle: ${p.handle}`);
    console.log(`Title: ${p.title}`);
    console.log(`Body: ${p.body_html.replace(/<[^>]+>/g, ' ').slice(0, 100).trim()}`);
    p.images.forEach(img => console.log(`  Img: ${img.src}`));
  }
});
