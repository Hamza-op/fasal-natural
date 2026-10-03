const fs = require('fs');

const data = JSON.parse(fs.readFileSync('products.json', 'utf8'));

// Search specifically for each halwa
const keywords = [
  'simple',
  'badam',
  'akhrot',
  'pista',
  'shahi',
  'dry fruit',
  'panjeeri'
];

keywords.forEach(kw => {
  console.log(`\n================ Keyword: "${kw}" ================`);
  const matches = data.products.filter(p => 
    p.title.toLowerCase().includes(kw) || 
    p.handle.toLowerCase().includes(kw) ||
    p.body_html.toLowerCase().includes(kw)
  );
  matches.forEach(m => {
    console.log(`Product: "${m.title}" (Handle: ${m.handle})`);
    console.log(`Description preview: ${m.body_html.replace(/<[^>]+>/g, ' ').slice(0, 150).trim()}`);
    console.log(`Images:`);
    m.images.forEach(img => {
      console.log(`   ID ${img.id}: ${img.src}`);
    });
  });
});
