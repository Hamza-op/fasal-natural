const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

const targetDir = path.join(__dirname, 'extracted_photos');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

// Download function
function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    const client = url.startsWith('https') ? https : http;
    client.get(url, (response) => {
      if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
        return downloadFile(response.headers.location, dest).then(resolve).catch(reject);
      }
      if (response.statusCode !== 200) {
        file.close();
        fs.unlinkSync(dest);
        return reject(new Error(`Failed to download ${url}: Status ${response.statusCode}`));
      }
      response.pipe(file);
      file.on('finish', () => {
        file.close(() => resolve(dest));
      });
    }).on('error', (err) => {
      file.close();
      if (fs.existsSync(dest)) fs.unlinkSync(dest);
      reject(err);
    });
  });
}

// Product images mapping from rewarisweetmart.pk
const catalogImages = [
  {
    product_id: 'simple-sohan-halwa',
    title_en: 'Simple Sohan Halwa',
    title_ur: 'سادہ سوہن حلوہ',
    images: [
      { filename: 'simple_sohan_halwa_main.webp', url: 'https://cdn.shopify.com/s/files/1/0748/4447/1330/files/simplesohanhalwa.webp?v=1772665145' },
      { filename: 'simple_sohan_halwa_box.jpg', url: 'https://cdn.shopify.com/s/files/1/0748/4447/1330/files/69.jpg?v=1772665145' },
      { filename: 'simple_sohan_halwa_detail.jpg', url: 'https://cdn.shopify.com/s/files/1/0748/4447/1330/files/68.jpg?v=1772665145' }
    ]
  },
  {
    product_id: 'badami-sohan-halwa',
    title_en: 'Badami Sohan Halwa',
    title_ur: 'بادامی سوہن حلوہ',
    images: [
      { filename: 'badami_sohan_halwa_main.webp', url: 'https://cdn.shopify.com/s/files/1/0748/4447/1330/files/1721441339-badam_20pak.webp?v=1771648555' },
      { filename: 'badami_sohan_halwa_box.jpg', url: 'https://cdn.shopify.com/s/files/1/0748/4447/1330/files/67.jpg?v=1772665145' }
    ]
  },
  {
    product_id: 'akhroti-sohan-halwa',
    title_en: 'Akhroti Sohan Halwa',
    title_ur: 'اخروٹی سوہن حلوہ',
    images: [
      { filename: 'akhroti_sohan_halwa_main.webp', url: 'https://cdn.shopify.com/s/files/1/0748/4447/1330/files/1721441254-Akhroti20Halwa.webp?v=1734076412' },
      { filename: 'akhroti_sohan_halwa_box.jpg', url: 'https://cdn.shopify.com/s/files/1/0748/4447/1330/files/57.jpg?v=1772660177' }
    ]
  },
  {
    product_id: 'double-akhroti-sohan-halwa',
    title_en: 'Double Akhroti Sohan Halwa',
    title_ur: 'ڈبل اخروٹی سوہن حلوہ',
    images: [
      { filename: 'double_akhroti_main.jpg', url: 'https://cdn.shopify.com/s/files/1/0748/4447/1330/files/Product_1.jpg?v=1771597389' },
      { filename: 'double_akhroti_detail.jpg', url: 'https://cdn.shopify.com/s/files/1/0748/4447/1330/files/Product_2.jpg?v=1771597389' }
    ]
  },
  {
    product_id: 'mix-dry-fruit-sohan-halwa',
    title_en: 'Mix Dry Fruit Sohan Halwa',
    title_ur: 'مکس ڈرائی فروٹ سوہن حلوہ',
    images: [
      { filename: 'mix_dry_fruit_main.jpg', url: 'https://cdn.shopify.com/s/files/1/0748/4447/1330/files/DSC03010_1.jpg?v=1749643282' },
      { filename: 'mix_dry_fruit_box.jpg', url: 'https://cdn.shopify.com/s/files/1/0748/4447/1330/files/60.jpg?v=1772661053' },
      { filename: 'mix_dry_fruit_combo.png', url: 'https://cdn.shopify.com/s/files/1/0748/4447/1330/files/4_in_1.png?v=1772661053' }
    ]
  },
  {
    product_id: 'pista-sohan-halwa',
    title_en: 'Pista Sohan Halwa',
    title_ur: 'پستہ سوہن حلوہ',
    images: [
      { filename: 'pista_sohan_halwa_main.webp', url: 'https://cdn.shopify.com/s/files/1/0748/4447/1330/files/pistahalwa.webp?v=1772672833' },
      { filename: 'pista_sohan_halwa_box.jpg', url: 'https://cdn.shopify.com/s/files/1/0748/4447/1330/files/74.jpg?v=1772672833' },
      { filename: 'pista_sohan_halwa_pack.png', url: 'https://cdn.shopify.com/s/files/1/0748/4447/1330/files/Pista_Halwa_2.png?v=1772672833' }
    ]
  },
  {
    product_id: 'special-sohan-halwa',
    title_en: 'Special Royal Sohan Halwa',
    title_ur: 'اسپیشل سوہن حلوہ',
    images: [
      { filename: 'special_sohan_halwa_main.webp', url: 'https://cdn.shopify.com/s/files/1/0748/4447/1330/files/shahisohanhalwa.webp?v=1772667061' },
      { filename: 'special_sohan_halwa_box.png', url: 'https://cdn.shopify.com/s/files/1/0748/4447/1330/files/2.png?v=1772667061' },
      { filename: 'special_sohan_halwa_tray.png', url: 'https://cdn.shopify.com/s/files/1/0748/4447/1330/files/3.png?v=1772667061' }
    ]
  },
  {
    product_id: 'desi-ghee-panjeeri',
    title_en: 'Desi Ghee Panjeeri',
    title_ur: 'دیسی گھی پنجیری',
    images: [
      { filename: 'desi_ghee_panjeeri_main.webp', url: 'https://cdn.shopify.com/s/files/1/0748/4447/1330/files/panjeeri.webp?v=1734076402' }
    ]
  }
];

async function run() {
  console.log('Starting download of product photos from Rewari Sweet Mart...');
  const results = [];

  for (const prod of catalogImages) {
    console.log(`\nProcessing: ${prod.title_en} (${prod.title_ur})`);
    const savedImages = [];
    for (const img of prod.images) {
      const destPath = path.join(targetDir, img.filename);
      try {
        console.log(`  Downloading ${img.filename}...`);
        await downloadFile(img.url, destPath);
        const stats = fs.statSync(destPath);
        console.log(`  ✓ Saved: ${img.filename} (${(stats.size / 1024).toFixed(1)} KB)`);
        savedImages.push({
          filename: img.filename,
          localPath: `extracted_photos/${img.filename}`,
          sourceUrl: img.url,
          sizeBytes: stats.size
        });
      } catch (err) {
        console.error(`  ✗ Error downloading ${img.url}:`, err.message);
      }
    }
    results.push({
      product_id: prod.product_id,
      title_en: prod.title_en,
      title_ur: prod.title_ur,
      images: savedImages
    });
  }

  fs.writeFileSync('extracted_photos_map.json', JSON.stringify(results, null, 2));
  console.log('\nAll available photos successfully downloaded and mapped in extracted_photos_map.json!');
}

run();
