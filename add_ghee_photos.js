const https = require('https');
const fs = require('fs');
const path = require('path');

// High-quality public photography of pure golden clarified butter / desi ghee
const gheeImages = [
  {
    filename: 'pure_desi_ghee_main.jpg',
    url: 'https://images.unsplash.com/photo-1628088062854-d1870b4553da?auto=format&fit=crop&w=800&q=80'
  },
  {
    filename: 'pure_desi_ghee_jar.jpg',
    url: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80'
  }
];

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return downloadFile(res.headers.location, dest).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        file.close();
        if (fs.existsSync(dest)) fs.unlinkSync(dest);
        return reject(new Error(`Failed with HTTP ${res.statusCode}`));
      }
      res.pipe(file);
      file.on('finish', () => file.close(() => resolve(dest)));
    }).on('error', (err) => {
      file.close();
      if (fs.existsSync(dest)) fs.unlinkSync(dest);
      reject(err);
    });
  });
}

async function addGhee() {
  const dir = path.join(__dirname, 'extracted_photos');
  for (const item of gheeImages) {
    const dest = path.join(dir, item.filename);
    try {
      console.log(`Downloading ${item.filename}...`);
      await downloadFile(item.url, dest);
      console.log(`✓ Saved ${item.filename}`);
    } catch (e) {
      console.error(`✗ Error: ${e.message}`);
    }
  }

  // Update map JSON
  const mapPath = path.join(__dirname, 'extracted_photos_map.json');
  if (fs.existsSync(mapPath)) {
    const map = JSON.parse(fs.readFileSync(mapPath, 'utf8'));
    map.push({
      product_id: 'pure-desi-ghee',
      title_en: 'Pure Desi Ghee',
      title_ur: 'خالص دیسی گھی',
      images: [
        {
          filename: 'pure_desi_ghee_main.jpg',
          localPath: 'extracted_photos/pure_desi_ghee_main.jpg',
          sourceUrl: gheeImages[0].url
        },
        {
          filename: 'pure_desi_ghee_jar.jpg',
          localPath: 'extracted_photos/pure_desi_ghee_jar.jpg',
          sourceUrl: gheeImages[1].url
        }
      ]
    });
    fs.writeFileSync(mapPath, JSON.stringify(map, null, 2));
    console.log('Updated extracted_photos_map.json with Pure Desi Ghee!');
  }
}

addGhee();
