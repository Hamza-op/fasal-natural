const https = require('https');
const fs = require('fs');

https.get('https://rewarisweetmart.pk/', { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log('Downloaded full HTML, size:', data.length);
    fs.writeFileSync('full_homepage.html', data);
    
    // Look for navigation menu links
    const navMatches = data.match(/<nav[\s\S]*?<\/nav>/gi) || [];
    console.log('Nav tags found:', navMatches.length);

    // Look for header content
    const headerMatches = data.match(/<header[\s\S]*?<\/header>/gi) || [];
    console.log('Header tags found:', headerMatches.length);

    // Headings
    const headings = data.match(/<h[1-4][^>]*>([\s\S]*?)<\/h[1-4]>/gi) || [];
    const cleanHeadings = [...new Set(headings.map(h => h.replace(/<[^>]+>/g, '').trim()))].filter(Boolean);
    console.log('Headings found (total ' + cleanHeadings.length + '):', cleanHeadings.slice(0, 30));

    // Images
    const imgs = data.match(/https:\/\/[^"'\s]+\.(?:jpg|jpeg|png|webp)/gi) || [];
    const shopifyImgs = [...new Set(imgs)].filter(img => img.includes('cdn.shopify.com'));
    console.log('Shopify CDN images found:', shopifyImgs.length);
    fs.writeFileSync('home_images.json', JSON.stringify(shopifyImgs.slice(0, 60), null, 2));

    // Links
    const links = [...new Set((data.match(/href="([^"#]+)"/g) || []).map(l => l.replace(/href="|"$/g, '')))];
    console.log('Unique site links:', links.filter(l => l.startsWith('/') || l.includes('rewarisweetmart')).slice(0, 40));
  });
}).on('error', err => console.error(err));
