const fs = require('fs');

const html = fs.readFileSync('full_homepage.html', 'utf8');

// Look for footer
const footerMatch = html.match(/<footer[\s\S]*?<\/footer>/i);
if (footerMatch) {
  const footerText = footerMatch[0].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ');
  console.log('--- FOOTER TEXT ---');
  console.log(footerText.slice(0, 1000));
}

// Look for promotional banners or text sections
const textBlocks = html.match(/<div class="[^"]*text[^"]*"[\s\S]*?<\/div>/gi) || [];
console.log('Text blocks sample:', textBlocks.slice(0, 5).map(t => t.replace(/<[^>]+>/g, ' ').trim().slice(0, 100)));

// Check for marquee / scrolling text
const marquee = html.match(/scrolling[\s\S]*?<\/div>/gi) || [];
if (marquee.length > 0) {
  console.log('--- SCROLLING / MARQUEE ---', marquee[0].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').slice(0, 300));
}

// Check review widget / count
const reviewMatches = html.match(/Based on \d+ reviews/i) || html.match(/\d+ reviews/i);
console.log('Reviews summary:', reviewMatches ? reviewMatches[0] : 'None');

// Check pages / policies
const pageLinks = [...new Set(html.match(/\/pages\/[a-zA-Z0-9_-]+/g) || [])];
console.log('Pages found:', pageLinks);

const policyLinks = [...new Set(html.match(/\/policies\/[a-zA-Z0-9_-]+/g) || [])];
console.log('Policies found:', policyLinks);
