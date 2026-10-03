const fs = require('fs');

const html = fs.readFileSync('full_homepage.html', 'utf8');

const footerStart = html.indexOf('<footer');
if (footerStart !== -1) {
  const footerEnd = html.indexOf('</footer>', footerStart);
  const footerHtml = html.slice(footerStart, footerEnd + 9);
  console.log('Footer length:', footerHtml.length);
  
  // Extract text and links from footer
  const links = footerHtml.match(/<a[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/gi) || [];
  console.log('Footer links:');
  links.forEach(l => {
    const text = l.replace(/<[^>]+>/g, '').trim();
    const href = l.match(/href="([^"]+)"/)?.[1];
    if (text) console.log(`  - ${text}: ${href}`);
  });
  
  // Extract paragraphs or divs in footer
  const pTags = footerHtml.match(/<p[^>]*>([\s\S]*?)<\/p>/gi) || [];
  pTags.forEach(p => {
    const text = p.replace(/<[^>]+>/g, '').trim();
    if (text) console.log('P:', text);
  });
}
