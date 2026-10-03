const fs = require('fs');
const html = fs.readFileSync('full_homepage.html', 'utf8');

const matches = html.match(/class="[^"]*footer[^"]*"/gi) || [];
console.log('Footer classes:', [...new Set(matches)]);

const mFooter = html.indexOf('m-footer');
if (mFooter !== -1) {
  console.log('Sample around m-footer:');
  console.log(html.slice(mFooter - 100, mFooter + 800));
}
