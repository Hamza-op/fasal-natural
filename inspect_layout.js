const fs = require('fs');

const html = fs.readFileSync('C:/Users/Hamza/.gemini/antigravity/brain/cbff516d-8fb0-4b3d-824c-6c843b825664/.system_generated/steps/2/content.md', 'utf8');

// Look for navigation menu links
const navMatches = html.match(/<nav[\s\S]*?<\/nav>/gi) || [];
console.log('Nav tags found:', navMatches.length);

// Look for header content
const headerMatches = html.match(/<header[\s\S]*?<\/header>/gi) || [];
console.log('Header tags found:', headerMatches.length);

// Extract announcement bar
const announcements = html.match(/announcement[^"'>]*[\s\S]*?<\/div>/gi) || [];
console.log('Announcements sample:', announcements.slice(0, 3).map(a => a.slice(0, 150)));

// Extract sections
const sections = html.match(/<section[^>]*id="([^"]+)"[^>]*>/gi) || [];
console.log('Sections:', sections.map(s => s.slice(0, 100)));

// Extract h1, h2, h3 texts
const headings = html.match(/<h[1-4][^>]*>([\s\S]*?)<\/h[1-4]>/gi) || [];
const cleanHeadings = [...new Set(headings.map(h => h.replace(/<[^>]+>/g, '').trim()))].filter(Boolean);
console.log('Headings found:', cleanHeadings.slice(0, 30));

// Extract phone numbers, whatsapp, emails, address
const phoneMatch = html.match(/(\+92[0-9\s\-]+|03[0-9]{9})/g);
console.log('Phones:', [...new Set(phoneMatch || [])]);

const emailMatch = html.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g);
console.log('Emails:', [...new Set(emailMatch || [])]);

// Look for banner images / hero images
const heroImages = html.match(/https:\/\/[^"'\s]+\.(?:jpg|jpeg|png|webp)/gi) || [];
const uniqueImages = [...new Set(heroImages)].filter(img => img.includes('cdn.shopify.com'));
console.log('Shopify CDN images found:', uniqueImages.length);
fs.writeFileSync('images_found.json', JSON.stringify(uniqueImages.slice(0, 50), null, 2));
