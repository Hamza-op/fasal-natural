const fs = require('fs');
const html = fs.readFileSync('full_homepage.html', 'utf8');

const footerIdx = html.indexOf('shopify-section-group-footer-group');
if (footerIdx !== -1) {
  const footerChunk = html.slice(footerIdx, footerIdx + 15000);
  const clean = footerChunk.replace(/<script[\s\S]*?<\/script>/gi, '')
                           .replace(/<style[\s\S]*?<\/style>/gi, '')
                           .replace(/<[^>]+>/g, ' ')
                           .replace(/\s+/g, ' ');
  console.log('FOOTER CONTENT:\n', clean.slice(0, 2000));
}
