const https = require('https');
const fs = require('fs');

async function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

async function analyze() {
  console.log('Fetching homepage...');
  const homeHtml = await fetchUrl('https://rewarisweetmart.pk/');
  
  // Extract products json from shopify products.json endpoint if available!
  console.log('Testing products.json endpoint...');
  try {
    const productsJson = await fetchUrl('https://rewarisweetmart.pk/products.json?limit=250');
    fs.writeFileSync('products.json', productsJson);
    const parsed = JSON.parse(productsJson);
    console.log(`Successfully fetched ${parsed.products.length} products!`);
    
    // Summarize categories / product types / tags
    const types = new Set();
    const tags = new Set();
    const sampleProducts = parsed.products.map(p => {
      types.add(p.product_type);
      const tagList = Array.isArray(p.tags) ? p.tags : (typeof p.tags === 'string' ? p.tags.split(',') : []);
      tagList.forEach(t => tags.add(String(t).trim()));
      return {
        id: p.id,
        title: p.title,
        handle: p.handle,
        product_type: p.product_type,
        price: p.variants?.[0]?.price,
        options: p.options,
        images: p.images?.slice(0, 2).map(img => img.src),
        body_summary: p.body_html?.replace(/<[^>]+>/g, '').slice(0, 100)
      };
    });
    
    fs.writeFileSync('analyzed_catalog.json', JSON.stringify({
      total: parsed.products.length,
      types: Array.from(types),
      tags: Array.from(tags),
      sampleProducts: sampleProducts
    }, null, 2));
    
  } catch (e) {
    console.error('Error fetching products.json:', e.message);
  }

  // Also check collections.json endpoint
  try {
    console.log('Testing collections.json endpoint...');
    const collectionsJson = await fetchUrl('https://rewarisweetmart.pk/collections.json');
    fs.writeFileSync('collections.json', collectionsJson);
    const parsedColls = JSON.parse(collectionsJson);
    console.log(`Successfully fetched ${parsedColls.collections.length} collections!`);
    fs.writeFileSync('analyzed_collections.json', JSON.stringify(parsedColls.collections.map(c => ({
      id: c.id,
      title: c.title,
      handle: c.handle,
      products_count: c.products_count
    })), null, 2));
  } catch (e) {
    console.error('Error fetching collections.json:', e.message);
  }
}

analyze();
