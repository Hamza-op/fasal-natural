const fs = require('fs');
const html = fs.readFileSync('full_homepage.html', 'utf8');

const gheeMatches = html.match(/[^"'<>]*ghee[^"'<>]*/gi) || [];
console.log('Ghee matches in full_homepage.html:', [...new Set(gheeMatches)]);
